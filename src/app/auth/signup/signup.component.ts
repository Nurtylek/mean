import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Abstract} from '../../posts/abstract';
import {SignInUpRM} from '../../core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent extends Abstract implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
    constructor(injector: Injector) {super(injector); }

    ngOnInit() {
        this.authStatusSub =  this.backend.authService.getAuthStatusListener().subscribe(authStatus => {
            this.isLoading = false;
        });
    }

    onRegister(registerForm: NgForm) {
        if (registerForm.invalid) {return; }
        this.isLoading = true;
        const model = new SignInUpRM({
            email: registerForm.value.email,
            password: registerForm.value.password
        });
        this.backend.authService.register(model);
    }

    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}
