import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error-interceptor';
import {API_URL} from '../helpers/helper';
import {Backend} from './services/backend.service';
import {PostService} from './services/post.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class BackendModule {
    public static forRoot(config: {apiUrl: string}): ModuleWithProviders {
        return {
            ngModule: BackendModule,
            providers: [
                // {
                //     provide: HTTP_INTERCEPTORS,
                //     useClass: AuthInterceptor,
                //     multi: true
                // },
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
                        PostService
                    ]
                }
            ]
        };
    }
}
