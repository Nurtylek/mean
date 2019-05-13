import {Component, Injector, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Abstract} from '../../posts/abstract';
import {SignInUpRM} from '../../core';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent extends Abstract implements OnInit {
    isLoading = false;

    constructor(injector: Injector) {super(injector); }

    ngOnInit() {
    }

    onLogin(loginForm: NgForm) {
        if (loginForm.invalid) {return; }
        this.isLoading = true;
        const model = new SignInUpRM({
            email: loginForm.value.email,
            password: loginForm.value.password
        });
        this.backend.authService.login(model);
    }
}
