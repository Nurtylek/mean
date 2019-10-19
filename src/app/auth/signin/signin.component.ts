import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Abstract} from '../../posts/abstract';
import {SignInUpRM} from '../../core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent extends Abstract implements OnInit, OnDestroy {
    isLoading = false;
    private loginSubs: Subscription;
    authMessage: string;

    constructor(injector: Injector) {super(injector); }

    ngOnInit() {
        this.loginSubs = this.backend.authService.getAuthStatusListener().subscribe(loginStatus => {
            this.isLoading = false;
        });

        this.backend.authService.getAuthMessage().subscribe((resp: {message: string}) =>  {
            this.authMessage = resp.message;
            console.log(this.authMessage);
        });
    }

    onLogin(loginForm: NgForm) {
        if (loginForm.invalid) {return; }
        this.isLoading = true;
        const model = new SignInUpRM({
            email: loginForm.value.email,
            password: loginForm.value.password
        });
        this.backend.authService.login(model);
        loginForm.resetForm();
    }

    closeModal() {
        this.authMessage = null;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.loginSubs.unsubscribe();
    }
}
