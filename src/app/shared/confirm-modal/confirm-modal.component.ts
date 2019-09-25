import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'confirm-modal',
    templateUrl: 'confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit{
    public message: string;
    public title: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public input: any
    ) { }

    public ngOnInit(): void {
        this.message = this.input.message;
        this.title = this.input.title || 'Confirm';
    }

    public confirm(): void {
        this.dialogRef.close(true);
    }

    public close(): void {
        this.dialogRef.close(false);
    }
}