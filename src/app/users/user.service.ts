import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GridColumn } from '../models/grid-column';
import { LaborCharge } from '../models/labor-charge';
import { Ticket } from '../models/ticket';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public readonly statuses = [
        {id: 1, label: 'Active' },
        {id: 2, label: 'Inactive' },
        {id: 3, label: 'Retired' },
        {id: 4, label: 'On Break' },
        {id: 5, label: 'Other' },
    ];

    public readonly trades = [
        {id: 1, label: 'Janitor' },
        {id: 2, label: 'Developer' },
        {id: 3, label: 'Manager' },
        {id: 4, label: 'Support' },
        {id: 5, label: 'Other' },
    ];

    private readonly columns: GridColumn[] = [
        <GridColumn>{
            name: 'username',
            label: 'Username',
            formatter: (user: User) => {
                return user.username;
            }
        },
        <GridColumn>{
            name: 'firstname',
            label: 'First Name',
            formatter: (user: User) => {
                return user.firstname;
            }
        },
        <GridColumn>{
            name: 'lastname',
            label: 'Last Name',
            formatter: (user: User) => {
                return user.lastname;
            }
        },
        <GridColumn>{
            name: 'email',
            label: 'Email',
            formatter: (user: User) => {
                return user.email;
            }
        },
        <GridColumn>{
            name: 'status',
            label: 'Status',
            formatter: (user: User) => {
                let status = this.statuses.find(s => s.id == user.status);
                if(status){
                    return status.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'trade',
            label: 'Trade',
            formatter: (user: User) => {
                let trade = this.trades.find(s => s.id == user.trade);
                if(trade){
                    return trade.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'dateCreated',
            label: 'Date Created',
            formatter: (user: User) => {
                if(user.dateCreated){
                    return (new Date(user.dateCreated)).toLocaleString();
                } else {
                    return '';
                }
            }
        }
    ];

    constructor(private api: ApiService) {}

    public getUsers(): Observable<User[]> {
        return this.api.get('user');
    }

    public getUser(id: string): Observable<User> {
        return this.api.get('user/'+id);
    }

    public registerUser(user: User): Observable<User> {
        return this.api.post('user/register', user);
    }

    public saveUser(user: User): Observable<User> {
        return this.api.post('user', user);
    }

    public deleteUser(id: string): Observable<User> {
        return this.api.delete('user/'+id);
    }

    public getColumns(): GridColumn[] {
        return this.columns;
    }

    public userQuickSearch(searchText: string): Observable<User[]> {
        return this.api.post('user/quicksearch', {searchText: searchText});
    }

    public getLaborCharges(userId: string): Observable<LaborCharge[]> {
        return this.api.get('user/laborcharges/'+userId);
    }

    public getTickets(userId: string): Observable<Ticket[]> {
        return this.api.get('user/tickets/'+userId);
    }
}