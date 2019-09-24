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
    public filter: string = '';
    public users: User[];

    public columns: GridColumn[];


    constructor(
        private userService: UserService,
        private router: Router) { }

    public ngOnInit(): void {
        this.loading = true;
        this.columns = this.userService.getColumns();
        this.userService.getUsers().subscribe(
            (users) => {
                this.users = users;
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    public selection(user: User): void {
        this.router.navigateByUrl('/users/'+user._id);
    }
}