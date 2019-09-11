import { Component, OnInit } from "@angular/core";
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from '../ticket.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: 'ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {
    public loading: boolean = false;
    public ticket: Ticket;

    constructor(
        public ticketService: TicketService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) =>{
                if(params.has('id')){
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
                this.ticket = ticket;
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        )
    }
}