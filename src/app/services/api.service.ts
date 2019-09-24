import { Injectable } from '@angular/core';
import * as config from '../config.json';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service.js';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private auth: AuthService) { }

    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(`${config.apiEndpoint}/${url}`, {
            headers: {
                authorization: `Bearer ${this.auth.token}`,
                'Content-Type': 'application/json',
                site: this.auth.getCurrentSite()
            }
        });
    }

    public post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(`${config.apiEndpoint}/${url}`, body, {
            headers: {
                authorization: `Bearer ${this.auth.token}`,
                'Content-Type': 'application/json',
                site: this.auth.getCurrentSite()
            }
        });
    }

    public put<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(`${config.apiEndpoint}/${url}`, body, {
            headers: {
                authorization: `Bearer ${this.auth.token}`,
                'Content-Type': 'application/json',
                site: this.auth.getCurrentSite()
            }
        });
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${config.apiEndpoint}/${url}`, {
            headers: {
                authorization: `Bearer ${this.auth.token}`,
                'Content-Type': 'application/json',
                site: this.auth.getCurrentSite()
            }
        });
    }
}