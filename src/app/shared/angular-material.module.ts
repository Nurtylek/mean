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
import { PlaceholderDirective } from './placeholder.directive';

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
        PlaceholderDirective
    ],
    declarations: [AlertComponent, PlaceholderDirective],
    entryComponents: [AlertComponent]
})
export class AngularMaterialModule {

}
