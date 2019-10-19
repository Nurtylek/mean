import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatExpansionModule,
    MatInputModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule
} from '@angular/material';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        AlertComponent
    ],
    declarations: [AlertComponent]
})
export class AngularMaterialModule {

}
