import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'notification-toolbar-button',
    template: `
    <a href="/notifications" (click)="$event.preventDefault()">
        <button  mat-icon-button [routerLink]="['/notifications']">
            <mat-icon *ngIf="!((unreadCount | async) > 0)">notifications</mat-icon>
            <mat-icon *ngIf="(unreadCount | async) > 0" [matBadge]="unreadCount | async" matBadgeColor="warn">notifications</mat-icon>
        </button>
    </a>
    `
})
export class NotificationToolbarButtonComponent implements OnInit, AfterViewInit {
    public unreadCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private subscription: Subscription = new Subscription();

    constructor(
        private notification: NotificationService,
        private alert: AlertService) { }

    public ngOnInit(): void {
        
    }

    public ngAfterViewInit(): void {
        this.notification.unreadCount().subscribe(
            (count: number) => {
                this.unreadCount.next(count);
                setInterval(() => {
                    this.subscription.unsubscribe();
                    this.subscription = this.notification.unreadCount().subscribe(
                        (count: number) => {
                            if (count && count > 0 && count > this.unreadCount.value) {
                                this.alert.beep();
                            }
                            this.unreadCount.next(count);
                        }, (error) => {
                            console.log(error);
                            this.unreadCount.next(0);
                        }
                    );
                }, 10000);
            }, (error) => {
                console.log(error);
                this.unreadCount.next(0);
            });
    }
}