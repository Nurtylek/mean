// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor{
//     constructor() {}
//
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const authToken = localStorage.getItem('token');
//         if (authToken) {
//             const request = req.clone({
//                 setHeaders: {
//                     authorization: `Bearer ${authToken}`
//                 }
//             });
//             return next.handle(request);
//         }
//         return next.handle(req);
//     }
// }
