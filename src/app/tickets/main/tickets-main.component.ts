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
    public tickets: Ticket[] = [];
    public routeLink = (ticket: Ticket): string => {
        return "/tickets/"+ticket._id;
    }

    public query = (queryCriteria) => {
        return this.ticketService.query(queryCriteria);
    }

    public columns: GridColumn[];


    constructor(
        public ticketService: TicketService,
        private router: Router) { }

    public ngOnInit(): void {
        this.columns = this.ticketService.getColumns();
    }

    public selection(ticket: Ticket): void {
        this.router.navigateByUrl('/tickets/'+ticket._id);
    }
}