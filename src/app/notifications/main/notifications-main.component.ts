import { Component, OnInit } from "@angular/core";
import { NotificationService } from '../notification.service';
import { Notification, NotificationData, NotificationType } from 'src/app/models/notification';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    templateUrl: 'notifications-main.component.html'
})
export class NotificationsMainComponent implements OnInit{
    public loading: boolean = true;
    public notifications: [NotificationData, Notification[]][] = [];

    public NotificationType = NotificationType;

    constructor(
        private notificationService: NotificationService,
        private alert: AlertService){}

    public ngOnInit(): void {
        this.notificationService.getNotifications().subscribe(
            (notifications: Notification[]) => {
                let set: Set<string> = new Set<string>();
                notifications.forEach(notification => {
                    if(notification.data){
                        let key = JSON.stringify(notification.data);
                        if(set.has(key)){
                            let notes = this.notifications.find(n => JSON.stringify(n[0]) == key);
                            notes[1].push(notification);
                        } else {
                            this.notifications.push([notification.data, [notification]]);
                            set.add(key);
                        }
                    }
                });
                this.loading = false;
            }, (error) => {
                this.alert.error('Error occurred while loading notifications');
                this.loading = false;
            }
        );
    }

    public setNotificationRead(notification): void {
        for(let ngrp of this.notifications){
            for(let note of ngrp[1]){
                if(note.id == notification.id){
                    note.read = true;
                    this.notificationService.updateNotification(note).subscribe(
                        (n: Notification) => {
                            note = n;
                    }, (error)=> {
                        this.alert.error('An error occurred while updating notification');
                    });
                }
            }
        }
    }

    public formatDate(date: Date): string {
        return (new Date(date)).toLocaleString();
    }
}