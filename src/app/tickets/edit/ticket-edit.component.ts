import { Component, OnInit } from "@angular/core";
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from '../ticket.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { cloneDeep } from 'lodash';
import { Asset } from 'src/app/models/asset';
import { Watch, WatchType } from 'src/app/models/watch';

@Component({
    templateUrl: 'ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public ticket: Ticket = new Ticket();
    public watch: Watch = new Watch();
    public WatchType = WatchType;

    private oTicket: Ticket = new Ticket();

    constructor(
        public ticketService: TicketService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alert: AlertService) { }

    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                if (params.has('id')) {
                    this.isEdit = true;
                    this.loading = true;
                    this.ticketService.getTicket(params.get('id')).subscribe(
                        (ticket: Ticket) => {
                            this.ticket = ticket;
                            this.oTicket = cloneDeep(ticket);
                            if(ticket.watches){
                                let ix = ticket.watches.findIndex(w => w.user._id == this.auth.user._id);
                                if(ix > -1){
                                    this.watch = cloneDeep(ticket.watches[ix]);
                                } else {
                                    this.watch = new Watch();
                                }
                            }
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.ticket = new Ticket();
                    this.oTicket = new Ticket();
                }
            }
        );
    }

    public save(): void {
        this.loading = true;
        this.ticket.dateCreated = new Date();
        this.ticket.userCreated = this.auth.user;
        if(this.watch && this.watch.user){
            if(this.ticket.watches){
                let ix = this.ticket.watches.findIndex(w => w.user._id == this.watch.user._id);
                if(ix > -1){
                    this.ticket.watches[ix] = this.watch;
                } else {
                    this.ticket.watches.push(this.watch);
                }
            } else {
                this.ticket.watches = [this.watch];
            }
        } else if(this.ticket.watches){
            let ix = this.ticket.watches.findIndex(w => w.user._id == this.auth.user._id);
            if(ix > -1){
                this.ticket.watches.splice(ix, 1);
            }
        }
        this.ticketService.saveTicket(this.ticket).subscribe(
            (ticket: Ticket) => {
                this.alert.success('Ticket saved');
                this.route.paramMap.subscribe(
                    (params: ParamMap) => {
                        if (!params.has('id')) {
                            this.router.navigateByUrl('tickets/' + ticket._id);
                        } else {
                            this.ticket = ticket;
                            this.oTicket = cloneDeep(ticket);
                            this.loading = false;
                        }
                    });
            },
            (error) => {
                console.log(error);
                this.loading = false;
                this.alert.error('Error while saving ticket');
            }
        )
    }

    public openNew(): void {
        if (JSON.stringify(this.ticket) == JSON.stringify(this.oTicket)) {
            this.router.navigateByUrl('tickets/new');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if (response) {
                        this.router.navigateByUrl('tickets/new');
                    }
                }
            );
        }
    }

    public delete(): void {
        this.alert.confirm('Are you sure you want to delete this ticket?').subscribe(
            (response: boolean) => {
                if (response) {
                    this.loading = true;
                    this.ticketService.deleteTicket(this.ticket._id).subscribe(
                        (ticket: Ticket) => {
                            if (ticket) {
                                this.router.navigateByUrl('tickets');
                            } else {
                                this.ticket = ticket;
                                this.alert.error('Error while deleting ticket');
                            }
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                            this.alert.error('Error while deleting ticket');
                        }
                    );
                }
            }
        );
    }

    public close(): void {
        if (JSON.stringify(this.ticket) == JSON.stringify(this.oTicket)) {
            this.router.navigateByUrl('tickets');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if (response) {
                        this.router.navigateByUrl('tickets');
                    }
                }
            );
        }
    }

    public openUser(user: User): void {
        if (user && user._id) {
            if (JSON.stringify(this.ticket) == JSON.stringify(this.oTicket)) {
                this.router.navigateByUrl('users/' + user._id);
            } else {
                this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                    (response: boolean) => {
                        if (response) {
                            this.router.navigateByUrl('users/' + user._id);
                        }
                    }
                );
            }
        }
    }

    public openAsset(asset: Asset): void {
        if (asset && asset._id) {
            if (JSON.stringify(this.ticket) == JSON.stringify(this.oTicket)) {
                this.router.navigateByUrl('inventory/' + asset._id);
            } else {
                this.alert.confirm('There are unsaved changes are you sure you want to leave?').subscribe(
                    (response: boolean) => {
                        if (response) {
                            this.router.navigateByUrl('inventory/' + asset._id);
                        }
                    }
                );
            }
        }
    }

    public watchText(): string {
        if (this.watch && this.watch.type) {
            switch (this.watch.type) {
                case WatchType.statusOnly:
                    return "Status Only";
                case WatchType.all:
                    return "All";
                case WatchType.ignore:
                    return "Ignore";
                default: return "";
            }
        } else {
            return "None";
        }
    }

    public setWatch(type?: WatchType): void {
        if(type){
            this.watch = <Watch>{
                type: type,
                user: this.auth.user
            }
        } else {
            this.watch = new Watch();
        }
    }
}