import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../helpers/helper';
import { HttpClient } from '@angular/common/http';
import { SignInUpRM } from '../../core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListenter = new Subject<boolean>();

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient,
                private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListenter.asObservable();
    }

    register(model: SignInUpRM) {
        this.http.post(`${this.apiUrl}/user/signup`, model).subscribe(res => {
            console.log(res);
        });
    }

    login(model: SignInUpRM) {
        this.http.post<{ token: string, expiresIn }>(`${this.apiUrl}/user/login`, model).subscribe(res => {
            this.token = res.token;
            if (this.token) {
                const expiresInDuration = res.expiresIn;
                this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, expiresInDuration * 1000);
                this.isAuthenticated = true;
                this.authStatusListenter.next(true);
                this.router.navigate(['/']);
            }
        });
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListenter.next(false);
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/']);
    }
}
