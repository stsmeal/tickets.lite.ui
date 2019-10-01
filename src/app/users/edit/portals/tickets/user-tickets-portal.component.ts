import { Component, Input, EventEmitter, Output } from "@angular/core";
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
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
                    this.alert.error('An error occurred while loading tickets');
                }
            );
        }
    }

    @Output() open: EventEmitter<Ticket> = new EventEmitter<Ticket>();

    public userChange: EventEmitter<User> = new EventEmitter<User>();
    public tickets: Ticket[];


    private _user: User;

    constructor(
        private userService: UserService,
        private alert: AlertService) {}

    public formatDate(date?: Date): string {
        return (date) ? (new Date(date)).toLocaleString() : '';
    }

    public edit(ticket?: Ticket): void{
        this.open.emit(ticket);
    }
}