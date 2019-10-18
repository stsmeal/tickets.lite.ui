import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../tenant.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'tenant-notification-modal',
    templateUrl: 'tenant-notification-modal.component.html'
})
export class TenantNotificationModalComponent implements OnInit{
    public message: string;

    private id: string;

    constructor(
        public dialogRef: MatDialogRef<TenantNotificationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public input: any,
        private tenantService: TenantService,
        private alert: AlertService
    ) { }

    public ngOnInit(): void {
        this.message = "";
        this.id = this.input.id;
    }

    public confirm(): void {
        if(this.message){
            this.tenantService.sendTenantNotification(this.id, this.message).subscribe(
                () => {
                    this.alert.success('Notification Sent');
            },(error)=>{
                this.alert.error('Notification failed to send');
            });
        }
        this.dialogRef.close();
    }

    public close(): void {
        this.dialogRef.close();
    }
}