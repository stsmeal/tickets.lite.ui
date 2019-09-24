import { Component, Input, EventEmitter } from "@angular/core";
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { Ticket } from 'src/app/models/ticket';

@Component({
    selector: 'user-tickets-portal',
    templateUrl: 'user-tickets-portal.component.html'
})
export class UserTicketsPortalComponent {
    @Input()
    get user() {
        return this._user;
    }
    set user(val: User) {
        this._user = val;
        this.userChange.emit(val);
        if(this.user && this.user._id){
            this.userService.getTickets(this.user._id).subscribe(
                (tickets: Ticket[]) => {
                    this.tickets = tickets;
                    this.tickets = this.tickets.slice();
                }, (error) => {
                    this.notification.error('An error occurred while loading tickets');
                }
            );
        }
    }

    public userChange: EventEmitter<User> = new EventEmitter<User>();
    public tickets: Ticket[];


    private _user: User;

    constructor(
        private userService: UserService,
        private notification: NotificationService) {}
    public formatDate(date?: Date): string {
        return (date) ? (new Date(date)).toLocaleString() : '';
    }
}