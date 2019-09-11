import { Component, Input } from "@angular/core";

@Component({
    selector: 'modal',
    template: `
    <div mat-dialog-title>
        <ng-content select="[modal-title]"></ng-content>
    </div>
    <div mat-dialog-content>
        <ng-content select="[modal-content]"></ng-content>
    </div>
    <div mat-dialog-actions>
        <ng-content select="[modal-footer]"></ng-content>
    </div>`
})
export class ModalComponent {
}