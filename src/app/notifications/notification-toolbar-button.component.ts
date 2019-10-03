import { Component, OnInit } from "@angular/core";
import { ApiService } from '../services/api.service';

@Component({
    selector: 'notification-toolbar-button',
    template: `
    
    <a href="/">
        <button  mat-flat-button color='primary' style="margin-right: 5px;"><mat-icon>work</mat-icon></button></a>
    `
})
export class NotificationToolbarButtonComponent implements OnInit{
    public unread: boolean = false;

    constructor(private api: ApiService){}

    public ngOnInit(): void {
    }
}