import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    registerRedirect = new EventEmitter();
    loginRedirect = new EventEmitter();
    login = new EventEmitter();
    register = new EventEmitter();

    constructor() {
    }
}
