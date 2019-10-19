import {Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Abstract} from '../../posts/abstract';
import {SignInUpRM} from '../../core';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../../shared/alert/alert.component';
import {PlaceholderDirective} from '../../shared/placeholder.directive';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent extends Abstract implements OnInit, OnDestroy {
    isLoading = false;
    private loginSubs: Subscription;
    private msgSubs: Subscription;
    private closeSub: Subscription;
    authMessage: string;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(injector: Injector,
                private componentFactoryResolver: ComponentFactoryResolver) {super(injector); }

    ngOnInit() {
        this.loginSubs = this.backend.authService.getAuthStatusListener().subscribe(loginStatus => {
            this.isLoading = false;
        });

        this.msgSubs = this.backend.authService.getAuthMessage().subscribe((resp: {message: string}) =>  {
            this.authMessage = resp.message;
            this.showAlert(this.authMessage);
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

    // closeModal() {
    //     this.authMessage = null;
    // }

    private showAlert(errorMessage: string) {
        const alertComponentFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        (alertComponentRef.instance as AlertComponent).message = errorMessage;
        this.closeSub = alertComponentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        this.loginSubs.unsubscribe();

        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}
