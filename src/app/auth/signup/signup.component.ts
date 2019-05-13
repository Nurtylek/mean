import {Component, Injector, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Abstract} from '../../posts/abstract';
import {SignInUpRM} from '../../core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent extends Abstract implements OnInit {
    isLoading = false;

    constructor(injector: Injector) {super(injector); }

    ngOnInit() {
    }

    onRegister(registerForm: NgForm) {
        if (registerForm.invalid) {return; }
        const model = new SignInUpRM({
            email: registerForm.value.email,
            password: registerForm.value.password
        });
        this.backend.authService.register(model);
    }
}
