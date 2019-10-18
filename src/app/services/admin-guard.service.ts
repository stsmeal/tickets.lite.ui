import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.auth.isAuthenticatedAsync().then((result) => {
      if(!result){
        this.router.navigate(['/sign-in']);
      } else {
          this.auth.isAdminAsync().then((isAdmin)=> {
            if(!isAdmin){
              this.router.navigate(['/tickets']);
            }
          });
      }
    });
    return true;
  }
}