import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        public modal: MatDialog,
        private breakpointObserver: BreakpointObserver){ }

    public open<T>(componet: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T, any> {
        if(!config){

        }
        return this.modal.open(componet, config);
    }
}