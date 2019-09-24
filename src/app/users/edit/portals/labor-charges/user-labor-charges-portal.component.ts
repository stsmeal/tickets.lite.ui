import { Component, Input, EventEmitter } from "@angular/core";
import { LaborCharge } from 'src/app/models/labor-charge';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'user-labor-charges-portal',
    templateUrl: 'user-labor-charges-portal.component.html'
})
export class UserLaborChargesPortalComponent {
    public readonly LaborChargeTypes = [{
        id: 1,
        label: 'Billable'
    },{
        id: 2,
        label: 'Non-billable'
    }];

    @Input()
    get user() {
        return this._user;
    }
    set user(val: User) {
        this._user = val;
        this.userChange.emit(val);
        if(this.user && this.user._id){
            this.userService.getLaborCharges(this.user._id).subscribe(
                (laborCharges: LaborCharge[]) => {
                    this.laborCharges = laborCharges;
                    this.laborCharges = this.laborCharges.slice();
                }, (error) => {
                    this.notification.error('An error occurred while loading labor charges');
                }
            );
        }
    }

    public userChange: EventEmitter<User> = new EventEmitter<User>();
    public laborCharges: LaborCharge[];


    private _user: User;

    constructor(
        private userService: UserService,
        private notification: NotificationService) {}
    
    public getLaborChargeType(id: number): string {
        let chargeType = this.LaborChargeTypes.find(nt => nt.id == id);
        return (chargeType && chargeType.label) ? chargeType.label : '';
    }

    public formatDate(date?: Date): string {
        return (date) ? (new Date(date)).toLocaleString() : '';
    }
}