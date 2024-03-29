import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ControlContainer, AbstractControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import * as config from '../config.json';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'create-workplace',
    templateUrl: 'create-workplace.component.html'
})
export class CreateWorkplaceComponent {
    get url(): string {
        return `${config.domainName}.${config.tld}`
    }

    public form = new FormGroup({
        site: new FormControl('', [Validators.required, this.siteValidator]),
        company: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);

    private passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
           ? null : {'mismatch': true};
    }

    private siteValidator(c: AbstractControl){
        return /^([A-Z]+\-{0,1}[a-z]+)+$/i.test(c.value) ? null : {'invalidSite': true};
    }

    constructor(
        private http: HttpClient,
        private alert: AlertService) { }

    public onSubmit(): void {
        this.http.post(config.apiEndpoint + '/auth/validsite', {site: this.form.value.site}).subscribe(
            (res: boolean) => {
                if(res){
                    let v = this.form.value;
                    let configuration = {
                        site: v.site,
                        companyName: v.company,
                        accountOwnerFirstname: v.firstname,
                        accountOwnerLastname: v.lastname,
                        accountOwnerEmail: v.email,
                        accountActive: true
                    };
                    let user = {
                        username: v.username,
                        site: v.site,
                        firstname: v.firstname,
                        lastname: v.lastname,
                        email: v.email,
                        password: v.password,
                        role: 'accountOwner'
                    };

                    this.http.post(config.apiEndpoint + '/auth/create', {configuration: configuration, user: user}).subscribe(
                        (res) => {
                            if(res){
                                let protocal = window.location.protocol;
                                window.open(`${protocal}//${this.form.value.site}.${this.url}/sign-in`, '_self');
                            } else {
                                this.alert.error('Error occurred while creating workplace');
                            }
                        }, (error)=>{
                            this.alert.error('Error occurred while creating workplace');
                        }
                    );
                } else {
                    this.alert.error('Site is taken');
                    this.form.value.site = "";
                }
            }, (error)=>{
                this.alert.error('Error occurred while creating workplace');
            }
        );
    }

    public getErrorMessage(control: AbstractControl){
        if(control.errors.required){
            return "Enter value";
        } else if(control.errors.email) {
            return "Enter valid email";
        } else if(control.errors.invalidSite){
            return "Invalid site name";
        }else {
            return "Dude..";
        }
    }
}