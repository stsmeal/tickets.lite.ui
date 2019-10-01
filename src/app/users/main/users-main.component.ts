import { Component, ViewChild, OnInit } from "@angular/core";
import { User } from 'src/app/models/user';
import { GridColumn } from 'src/app/models/grid-column';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    templateUrl: 'users-main.component.html'
})
export class UsersMainComponent implements OnInit {
    public loading: boolean = false;
    public users: User[];
    public routeLink = (user: User): string => {
        return '/users/'+user._id;
    }

    public query = (queryCriteria) => {
        return this.userService.query(queryCriteria);
    }

    public columns: GridColumn[];


    constructor(
        private userService: UserService,
        private router: Router) { }

    public ngOnInit(): void {
        this.columns = this.userService.getColumns();
    }

    public selection(user: User): void {
        this.router.navigateByUrl('/users/'+user._id);
    }
}