import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.auth.isAuthenticatedAsync().then((result) => {
      if(!result){
        this.router.navigate(['/sign-in']);
      }
    })
    return true;
  }
}