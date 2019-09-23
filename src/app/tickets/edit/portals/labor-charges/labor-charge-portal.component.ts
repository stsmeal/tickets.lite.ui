import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { LaborCharge } from 'src/app/models/labor-charge';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/users/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'labor-charge-portal',
    templateUrl: 'labor-charge-portal.component.html'
})
export class LaborChargePortalComponent implements OnInit {
    public readonly LaborChargeTypes = [{
        id: 1,
        label: 'Billable'
    },{
        id: 2,
        label: 'Non-billable'
    }];

    @Input()
    get laborCharges() {
        return this.laborChargesValue;
    }
    set laborCharges(val: LaborCharge[]){
        this.laborChargesValue = val;
        this.laborChargesChange.emit(val);
    }

    @Output() laborChargesChange: EventEmitter<LaborCharge[]> = new EventEmitter<LaborCharge[]>();

    @ViewChild('laborChargeModal', {static: true}) laborChargeModal: TemplateRef<any>;

    public laborCharge: LaborCharge;
    public modalRef: MatDialogRef<any>;

    public searchText: string;
    public searchAssignments: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    private laborChargesValue: LaborCharge[];
    private laborChargeIndex: number;

    private subscriber: Subscription = new Subscription();

    constructor(
        private modalService: ModalService,
        private userService: UserService
    ){}

    public ngOnInit(): void {
        if(!this.laborCharges){
            this.laborCharges = [];
        }
    }

    public edit(laborCharge?: LaborCharge): void {
        if(!laborCharge){
            this.laborCharge = new LaborCharge();
            this.searchText = "";
        } else {
            this.laborCharge = laborCharge;
            if(laborCharge.assignment){
                this.searchText = laborCharge.assignment.lastname + ", " + laborCharge.assignment.firstname;
            }
        }

        this.laborChargeIndex = this.laborCharges.findIndex(lc => lc == laborCharge);
        this.modalRef = this.modalService.open(this.laborChargeModal, { width: '1200px'});

        this.modalRef.afterClosed().subscribe(
            (_laborCharge: LaborCharge) => {
                if(_laborCharge){
                    _laborCharge.dateUpdated = new Date();

                    if(this.laborChargeIndex >= 0){
                        this.laborCharges[this.laborChargeIndex] = _laborCharge;
                    } else {
                        _laborCharge.dateCreated = new Date();
                        this.laborCharges.push(_laborCharge);
                    }

                    this.laborCharges = this.laborCharges.slice();
                }
        });
    }

    public delete(note: LaborCharge): void {
        let ix = this.laborCharges.findIndex(n => n == note);
        if(ix > -1){
            this.laborCharges.splice(ix, 1);
            this.laborCharges = this.laborCharges.slice();
        }
    }

    public getLaborChargeType(id: number): string {
        let chargeType = this.LaborChargeTypes.find(nt => nt.id == id);
        return (chargeType && chargeType.label) ? chargeType.label : '';
    }

    public change(): void {
        if(this.searchText && this.searchText.length > 0){
            this.subscriber.unsubscribe();
            this.subscriber = this.userService.userQuickSearch(this.searchText).subscribe(
                (users: User[]) => {
                    users = users.filter(u => !this.laborCharge.assignment || this.laborCharge.assignment._id != u._id);
                    this.searchAssignments.next(users);
            }, (error) => {
                console.log(error);
                this.searchAssignments.next([]);
            });
        } else {
            this.searchAssignments.next([]);
        }
    }

    public selection(event: MatAutocompleteSelectedEvent): void {
        let user = <User>event.option.value;
        this.laborCharge.assignment = user;
        this.searchText = user.lastname + ", " + user.firstname;
        this.searchAssignments.next([]);
    }
}