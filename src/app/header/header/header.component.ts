import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Abstract } from 'src/app/posts/abstract';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent extends Abstract implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    constructor(injector: Injector) { super(injector); }

    ngOnInit() {
        this.authListenerSubs = this.backend.authService.getAuthStatusListener().subscribe(isAuth => {
            this.userIsAuthenticated = isAuth;
        });
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }

    onLogout() {
        this.backend.authService.logout();
    }
}
