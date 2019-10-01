import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { cloneDeep } from 'lodash';
import { Ticket } from 'src/app/models/ticket';

@Component({
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public user: User = new User();

    private oUser: User = new User();

    public passwordConfirm: string;

    constructor(
        public userService: UserService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alert: AlertService) {}

        
    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) =>{
                if(params.has('id')){
                    this.isEdit = true;
                    this.loading = true;
                    this.userService.getUser(params.get('id')).subscribe(
                        (user: User) => {
                            this.user = user;
                            this.oUser = cloneDeep(user);
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.user = new User();
                    this.oUser = new User();
                }
            }
        );
    }

    public save(): void {
        this.loading = true;
        this.user.dateCreated = new Date();
        if(!this.isEdit){
            if(!this.user.username){
                this.alert.error('Enter a username');
            } else if(!this.user.password){
                this.alert.error('Enter a password');
            } else if(this.user.password != this.passwordConfirm){
                this.alert.error('Passwords do not match');
            } else {
                this.userService.registerUser(this.user).subscribe(
                    (user: User) => {
                        this.alert.success('User saved');
                        this.route.paramMap.subscribe(
                            (params: ParamMap) =>{
                                if(!params.has('id')){
                                    this.router.navigateByUrl('users/' + user._id);
                                } else {
                                    this.user = user;
                                    this.oUser = cloneDeep(user);
                                    this.loading = false;
                                }
                            });
                    },
                    (error) => {
                        console.log(error);
                        this.loading = false;
                        this.alert.error('Error while saving user');
                    }
                );
            }
        } else {
            this.userService.saveUser(this.user).subscribe(
                (user: User) => {
                    this.alert.success('User saved');
                    this.route.paramMap.subscribe(
                        (params: ParamMap) =>{
                            if(!params.has('id')){
                                this.router.navigateByUrl('users/' + user._id);
                            } else {
                                this.user = user;
                                this.oUser = cloneDeep(user);
                                this.loading = false;
                            }
                        });
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.alert.error('Error while saving user');
                }
            );
        }
    }

    public openNew(): void {
        if(JSON.stringify(this.user) == JSON.stringify(this.oUser)){
            this.router.navigateByUrl('users/new');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.router.navigateByUrl('users/new');
                    }
                }
            );
        }
    }


    public delete(): void {
        if(JSON.stringify(this.user) == JSON.stringify(this.oUser)){
            this.router.navigateByUrl('users');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.loading = true;
                        this.userService.deleteUser(this.user._id).subscribe(
                            (user: User) => {
                                if(user){
                                    this.router.navigateByUrl('users');
                                } else {
                                    this.user = user;
                                    this.alert.error('Error while deleting user');
                                }
                                this.loading = false;
                            }, 
                            (error) => {
                                console.log(error);
                                this.loading = false;
                                this.alert.error('Error while deleting user');
                            }
                        );
                    }
                }
            );
        }
    }
    
    public close(): void {
        if(JSON.stringify(this.user) == JSON.stringify(this.oUser)){
            this.router.navigateByUrl('users');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.router.navigateByUrl('users');
                    }
                }
            );
        }
    }


    public openTicket(ticket: Ticket): void {
        if(ticket && ticket._id){
            if(JSON.stringify(this.user) == JSON.stringify(this.oUser)){
                this.router.navigateByUrl('tickets/'+ticket._id);
            } else {
                this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                    (response: boolean) => {
                        if(response){
                            this.router.navigateByUrl('tickets/'+ticket._id);
                        }
                    }
                );
            }
        }
    }
}