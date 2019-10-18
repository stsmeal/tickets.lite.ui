import { Injectable } from "@angular/core";
import * as config from '../config.json';
import { HttpClient } from '@angular/common/http';
import * as localForage from 'localforage';
import { Observable } from 'rxjs';
import { User } from '../models/user.js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public loading: boolean = false;

    private readonly TOKEN_KEY = 'cms_lite_token';
    private readonly USER_KEY = 'cms_lite_user';
    private readonly ADMIN_KEY = 'cms_lite_admin';
    private readonly REMEMBER_ME_KEY = 'cms_lite_remember_me';

    private _token: string;
    private _user: User;
    private _isAdmin: boolean;
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

    get isAdmin(): boolean {
        return this._isAdmin;
    }
    set isAdmin(value: boolean) {
        this._isAdmin = value;
        this.localForage.setItem<boolean>(this.ADMIN_KEY, value);
    }

    get rememberMe(): boolean {
        return this._rememberMe;
    }
    set rememberMe(value: boolean) {
        this._rememberMe = value;
        this.localForage.setItem<boolean>(this.REMEMBER_ME_KEY, value);
    }

    get isAuthenticated(): boolean {
        if (this.token && this.token.length) {
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
                        this.localForage.getItem<boolean>(this.ADMIN_KEY).then(
                            (isAdmin: boolean) => {
                                this.isAdmin = isAdmin;
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
        ).catch(() => this.loading = false);
    }

    public async isAuthenticatedAsync() {
        let token = await this.localForage.getItem<string>(this.TOKEN_KEY);
        if (token && token.length) {
            return true;
        } else {
            return false;
        }
    }

    public async isAdminAsync() {
        let isAdmin = await this.localForage.getItem<boolean>(this.ADMIN_KEY);
        if (isAdmin) {
            return true;
        } else {
            return false;
        }
    }

    public authenticate(username: string, password: string): Observable<any> {
        return this.http.post(config.apiEndpoint + '/auth/token', 
        { username: username, password: password },{
        headers: {
            'Content-Type': 'application/json',
            site: this.getCurrentSite()
        }});
    }

    public getCurrentSite(): string {
        let hosttree = window.location.host.split('.');
        if (hosttree.length == 3 && hosttree[1].toLowerCase() == config.domainName) {
            return hosttree[0].toLowerCase();
        } else {
            return 'cmslite';
        }
    }
}