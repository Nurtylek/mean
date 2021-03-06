import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import {AppRoutingModule} from './app.routing.module';
import {BackendModule} from './backend';
import {ErrorComponent} from './error/error.component';
import {AngularMaterialModule} from './shared/angular-material.module';
import {PostsModule} from './posts/posts.module';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        PostsModule,
        BackendModule.forRoot({
            apiUrl: environment.apiUrl
        })
    ],
    entryComponents: [
        ErrorComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
