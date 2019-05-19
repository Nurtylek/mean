import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from '../../error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private matDialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => {
                    let errorMessage = 'An unknown error occurred!';
                    if (error.error.message) {
                        errorMessage =  error.error.message;
                    }
                    this.matDialog.open(ErrorComponent, {data: {
                            message: errorMessage
                        }});
                    return throwError(error);
                })
            );
    }
}
