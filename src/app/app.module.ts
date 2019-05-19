import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatExpansionModule,
    MatInputModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {AppRoutingModule} from './app.routing.module';
import {BackendModule} from './backend';
import {ErrorComponent} from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        PostCreateComponent,
        HeaderComponent,
        PostListComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        BackendModule.forRoot({
            apiUrl: 'http://localhost:3500/api'
        })
    ],
    entryComponents: [
        ErrorComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
