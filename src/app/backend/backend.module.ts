import { ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { Backend } from './services/backend.service';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import {API_URL} from '../helpers/helpers';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class BackendModule {
    public static forRoot(config: { apiUrl: string }): ModuleWithProviders {
        return {
            ngModule: BackendModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                },
                {
                    provide: API_URL,
                    useValue: config.apiUrl
                },
                {
                    provide: Backend,
                    useClass: Backend,
                    deps: [
                        AuthService,
                        PostService
                    ]
                }
            ]
        };
    }
}
