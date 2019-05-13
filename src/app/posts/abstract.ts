import {AfterContentInit, AfterViewInit, ChangeDetectorRef, HostListener, Injector, OnDestroy, OnInit} from '@angular/core';
import {Backend} from '../backend';
import {ActivatedRoute, Router} from '@angular/router';

export class Abstract implements OnDestroy, OnInit, AfterViewInit, AfterContentInit {
    viewInitialized = false;
    contentInitialized = false;

    protected backend: Backend;
    protected route: ActivatedRoute;
    protected router: Router;
    protected changeDetector: ChangeDetectorRef;

    constructor(protected injector: Injector) {
        this.backend = injector.get(Backend);
        this.changeDetector = injector.get(ChangeDetectorRef);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
    }

    ngOnInit(): void {
    }

    @HostListener('window:beforeunload')
    ngOnDestroy(): void {
    }

    ngAfterContentInit(): void {
        this.contentInitialized = true;
        this.changeDetector.detectChanges();
    }

    ngAfterViewInit(): void {
        this.viewInitialized = true;
        this.changeDetector.detectChanges();
    }

}
