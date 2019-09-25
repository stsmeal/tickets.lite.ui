import { Component } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'settings-menu',
    templateUrl: 'settings-menu.component.html'
})
export class SettingsMenuComponent {
    constructor(
        public auth: AuthService,
        private router: Router) {}

    public openUser(): void {
        this.router.navigateByUrl('users/'+this.auth.user._id);
    }

    public openSettings(): void {
        this.router.navigateByUrl('settings');
    }

    public logout(): void {
        this.auth.token = null;
        this.router.navigate(['/sign-in']);
    }
}