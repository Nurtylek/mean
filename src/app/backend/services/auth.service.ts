import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInUpRM } from '../../core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import {API_URL} from '../../helpers/helpers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private userId: string;
    private failMessage = new Subject<{message: string}>();

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient,
                private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getAuthMessage() {
        return this.failMessage.asObservable();
    }

    register(model: SignInUpRM) {
        this.http.post(`${this.apiUrl}/user/signup`, model).subscribe(res => {
            this.router.navigate(['/']);
        }, error => {
            this.authStatusListener.next(false);
            console.log(error);
        });
    }

    login(model: SignInUpRM) {
        this.http.post<{ token: string, expiresIn, userId: string }>(`${this.apiUrl}/user/login`, model)
            .subscribe(res => {
            this.token = res.token;
            if (this.token) {
                const expiresInDuration = res.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userId = res.userId;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date( now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(this.token, expirationDate, this.userId);
                this.router.navigate(['/']);
            }
        }, error => {
            this.authStatusListener.next(false);
            this.failMessage.next(error)
        });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.userId = authInformation.userId;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.userId = null;
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        console.log(`Setting timer ${duration}`);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return ;
        }
        return {
            token,
            expirationDate: new Date(expirationDate),
            userId
        };
    }
}
