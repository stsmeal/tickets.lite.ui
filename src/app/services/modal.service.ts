import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        public modal: MatDialog){ }

    public open<T>(componet: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T, any> {
        return this.modal.open(componet, config);
    }
}