import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
    selector: 'create-workplace',
    templateUrl: 'create-workplace.component.html'
})
export class CreateWorkplaceComponent {
    public form = new FormGroup({
        site: new FormControl('', Validators.required),
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

    constructor() { }

    public onSubmit(): void {

    }

    public getErrorMessage(control: AbstractControl){
        if(control.errors.required){
            return "Enter Value";
        } else if(control.errors.email) {
            return "Enter Valid Email"
        } else {
            return "Dude..";
        }
    }
}