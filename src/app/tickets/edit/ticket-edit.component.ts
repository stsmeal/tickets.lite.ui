import { Component, OnInit } from "@angular/core";
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from '../ticket.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    templateUrl: 'ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public ticket: Ticket = new Ticket();

    constructor(
        public ticketService: TicketService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private notification: NotificationService) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) =>{
                if(params.has('id')){
                    this.isEdit = true;
                    this.loading = true;
                    this.ticketService.getTicket(params.get('id')).subscribe(
                        (ticket: Ticket) => {
                            this.ticket = ticket;
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.ticket = new Ticket();
                }
            }
        );
    }

    public save(): void {
        this.loading = true;
        this.ticket.dateCreated = new Date();
        this.ticket.userCreated = this.auth.user;
        this.ticketService.saveTicket(this.ticket).subscribe(
            (ticket: Ticket) => {
                this.notification.success('Ticket saved');
                this.route.paramMap.subscribe(
                    (params: ParamMap) =>{
                        if(!params.has('id')){
                            this.router.navigateByUrl('tickets/' + ticket._id);
                        } else {
                            this.ticket = ticket;
                            this.loading = false;
                        }
                    });
            },
            (error) => {
                console.log(error);
                this.loading = false;
                this.notification.error('Error while saving ticket');
            }
        )
    }

    public delete(): void {
        this.loading = true;
        this.ticketService.deleteTicket(this.ticket._id).subscribe(
            (ticket: Ticket) => {
                if(ticket){
                    this.router.navigateByUrl('tickets');
                } else {
                    this.ticket = ticket;
                    this.notification.error('Error while deleting ticket');
                }
                this.loading = false;
            }, 
            (error) => {
                console.log(error);
                this.loading = false;
                this.notification.error('Error while deleting ticket');
            }
        )
    }
}