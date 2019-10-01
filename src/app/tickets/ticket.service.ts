import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { GridColumn } from '../models/grid-column';
import { SortDirection } from '@angular/material/sort';
import { QueryCriteria } from '../models/query';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    public readonly statuses = [
        {id: 1, label: 'Active' },
        {id: 2, label: 'Pending' },
        {id: 3, label: 'In Progress' },
        {id: 4, label: 'Deferred' },
        {id: 5, label: 'Complete' },
    ];

    public readonly categories = [
        {id: 1, label: 'Preventive Maintance' },
        {id: 2, label: 'Corrective Maintance' },
        {id: 3, label: 'Urgent' },
        {id: 4, label: 'Management' },
        {id: 5, label: 'Other' },
    ];

    private readonly columns: GridColumn[] = [
        <GridColumn>{
            name: 'number',
            label: 'Number',
            formatter: (ticket: Ticket) => {
                return ticket.number.toString();
            }
        },
        <GridColumn>{
            name: 'description',
            label: 'Description',
            formatter: (ticket: Ticket) => {
                return ticket.description;
            }
        },
        <GridColumn>{
            name: 'status',
            label: 'Status',
            formatter: (ticket: Ticket) => {
                let status = this.statuses.find(s => s.id == ticket.status);
                if(status){
                    return status.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'category',
            label: 'Category',
            formatter: (ticket: Ticket) => {
                let category = this.categories.find(s => s.id == ticket.category);
                if(category){
                    return category.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'dateCreated',
            label: 'Date Created',
            formatter: (ticket: Ticket) => {
                if(ticket.dateCreated){
                    return (new Date(ticket.dateCreated)).toLocaleString();
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'dateCompleted',
            label: 'Date Completed',
            formatter: (ticket: Ticket) => {
                if(ticket.dateCompleted){
                    return (new Date(ticket.dateCompleted)).toLocaleString();
                } else {
                    return '';
                }
            }
        }
    ];

    constructor(
        private api: ApiService,
        private auth: AuthService) { }

    public getColumns(): GridColumn[] {
        return this.columns;
    }

    public getTickets(): Observable<Ticket[]> {
        return this.api.get('ticket');
    }
    
    public getTicket(id: string): Observable<Ticket> {
        return this.api.get(`ticket/${id}`);
    }

    public saveTicket(ticket: Ticket) {
        return this.api.post('ticket', ticket);
    }

    public deleteTicket(id: string): Observable<Ticket> {
        return this.api.delete('ticket/' + id);
    }

    public query(queryCriteria: QueryCriteria): Observable<Ticket[]>{
        return this.api.post('ticket/query', queryCriteria);
    }
}