import {Injectable, InjectionToken} from '@angular/core';
export const API_URL = new InjectionToken<string>('api.url passed from root module');

@Injectable({providedIn: 'root'})
export class Helper {
    constructor() {}
}
