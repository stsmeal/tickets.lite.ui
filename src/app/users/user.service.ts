import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private api: ApiService) {}

    public userQuickSearch(searchText: string): Observable<User[]> {
        return this.api.post('user/quicksearch', {searchText: searchText});
    }
}