import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import * as config from '../../config.json';

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit {
    public form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
    })

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
        private alert: AlertService) {}

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
        this.auth.authenticate(this.form.value.username, this.form.value.password).subscribe(
            (response: any) => {
                const {token, user, isAdmin} = response;
                this.auth.token = token;
                this.auth.user = <User>user;
                this.auth.isAdmin = isAdmin;
                this.auth.rememberMe = this.form.value.rememberMe;
                this.authenticating = false;
                if(isAdmin){
                    this.router.navigate(['/tenants']);
                } else {
                    this.router.navigate(['/tickets']);
                }
            }, (error) => {
                if(error.error == 'Incorrect Username or Password'){
                    this.alert.error('Incorrect Username or Password');
                } else {
                    this.alert.error('An occurred while signing in');
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