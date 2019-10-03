import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService{
    constructor(private api: ApiService){}

    public getNotifications(): Observable<Notification[]> {
        return this.api.get('notifications');
    }

    public isUnreadNotification(): Observable<boolean> {
        return this.api.get('notifications/new');
    }

    public updateNotifications(notifications: Notification[]): Observable<Notification[]> {
        return this.api.post('notifications/update', notifications);
    }
}