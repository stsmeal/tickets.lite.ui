import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import * as config from '../../config.json';

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit {
    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);
    public rememberMe: boolean = true;

    public authenticating: boolean = false;
    public signInText: string = "Sign In";

    public workplace: string = "";
    public findWorkplace: boolean = false;
    
    get url(): string {
        return `${config.domainName}.${config.tld}`
    }

    constructor(
        private auth: AuthService,
        private router: Router,
        private notification: NotificationService) {}

    public ngOnInit(): void {
        let hosttree = window.location.host.split('.');
        if (!(hosttree.length == 3 && hosttree[1].toLowerCase() == config.domainName) 
            && !(hosttree.length == 1  && hosttree[1].toLowerCase() == 'localhost')) {
            this.findWorkplace = true;
        } 
    }

    public signIn(): void {
        this.authenticating = true;
        this.signInText = "Signing In...";
        this.auth.authenticate(this.username.value, this.password.value).subscribe(
            (response: any) => {
                const {token, user} = response;
                this.auth.token = token;
                this.auth.user = <User>user;
                this.auth.rememberMe = this.rememberMe;
                this.authenticating = false;
                this.router.navigate(['/tickets']);
            }, (error) => {
                if(error.error == 'Incorrect Username or Password'){
                    this.notification.error('Incorrect Username or Password');
                } else {
                    this.notification.error('An occurred while signing in');
                }
                console.log(error);
                this.authenticating = false;
                this.signInText = "Sign In";
            }
        );
    }

    public goToWorkplace(): void {
        if(this.workplace){
            let protocal = window.location.protocol;
            window.open(`${protocal}//${this.workplace}.${this.url}`, '_self');
        }
    }
}