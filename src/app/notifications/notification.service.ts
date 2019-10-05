import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService{
    constructor(private api: ApiService){}

    public getNotifications(): Observable<Notification[]> {
        return this.api.get('notifications');
    }

    public unreadCount(): Observable<number> {
        return this.api.get('notifications/unreadCount');
    }

    public updateNotification(notification: Notification): Observable<Notification> {
        return this.api.put('notifications', notification);
    }
}