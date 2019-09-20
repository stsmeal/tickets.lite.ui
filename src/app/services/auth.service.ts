import { Injectable } from "@angular/core";
import * as config from '../config.json';
import { HttpClient } from '@angular/common/http';
import * as localForage from 'localforage';
import { Observable } from 'rxjs';
import { User } from '../models/user.js';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    public loading: boolean = false;

    private readonly TOKEN_KEY = 'cms_lite_token';
    private readonly USER_KEY = 'cms_lite_user';
    private readonly REMEMBER_ME_KEY = 'cms_lite_remember_me';

    private _token: string;
    private _user: User;
    private _rememberMe: boolean;
    
    private localForage = localForage;

    get token(): string {
        return this._token;
    }
    set token(value: string) {
        this._token = value;
        this.localForage.setItem<string>(this.TOKEN_KEY, value);
    }

    get user(): User {
        return this._user;
    }
    set user(value: User) {
        this._user = value;
        this.localForage.setItem<any>(this.USER_KEY, value);
    }

    get rememberMe(): boolean {
        return this._rememberMe;
    }
    set rememberMe(value: boolean) {
        this._rememberMe = value;
        this.localForage.setItem<boolean>(this.REMEMBER_ME_KEY, value);
    }

    get isAuthenticated(): boolean {
        if(this.token && this.token.length){
            return true;
        } else {
            return false;
        }
    }

    constructor(private http: HttpClient) { 
        this.loading = true;
        this.localForage.getItem<string>(this.TOKEN_KEY).then(
            (token: string) => {
                this.token = token;
                this.localForage.getItem<any>(this.USER_KEY).then(
                    (user: any) => {
                        this.user = <User>user;
                        this.localForage.getItem<boolean>(this.REMEMBER_ME_KEY).then(
                            (rememberMe: boolean) => {
                                this.rememberMe = rememberMe;
                                this.loading = false;
                            }
                        ).catch(() => this.loading = false);
                    }
                ).catch(() => this.loading = false);
            }
        ).catch(() => this.loading = false);
    }

    public async isAuthenticatedAsync(){
        let token = await this.localForage.getItem<string>(this.TOKEN_KEY);
        if(token && token.length){
            return true;
        } else {
            return false;
        }
    }

    public authenticate(username: string, password: string): Observable<any> {
        return this.http.post(config.apiEndpoint + '/user/authenticate', {username: username, password: password});
    }
}