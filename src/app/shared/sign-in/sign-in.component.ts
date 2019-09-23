import { Component } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent {
    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required]);
    public rememberMe: boolean = true;

    public authenticating: boolean = false;
    public signInText: string = "Sign In";

    constructor(
        private auth: AuthService,
        private router: Router,
        private notification: NotificationService) {}

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
                    this.notification.error(error.error);//<-iconic
                } else {
                    this.notification.error('An occurred while signing in');
                }
                console.log(error);
                this.authenticating = false;
                this.signInText = "Sign In";
            }
        );
    }
}