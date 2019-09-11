import { Component, ViewChild, OnInit } from "@angular/core";
import { TicketService } from '../ticket.service';
import { Ticket } from 'src/app/models/ticket';
import { GridColumn } from 'src/app/models/grid-column';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'tickets-main.component.html'
})
export class TicketsMainComponent implements OnInit {
    public loading: boolean = false;
    public filter: string = '';
    public tickets: Ticket[];

    public columns: GridColumn[];


    constructor(
        public ticketService: TicketService,
        private router: Router) { }

    public ngOnInit(): void {
        this.loading = true;
        this.columns = this.ticketService.getColumns();
        this.ticketService.getTickets().subscribe(
            (tickets) => {
                this.tickets = tickets;
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    public selection(ticket: Ticket): void {
        this.router.navigateByUrl('/tickets/'+ticket._id);
    }
}