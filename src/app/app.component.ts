import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, UrlTree } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isSmallScreen: boolean = false;

  constructor(
    public auth: AuthService,
    public breakpointObserver: BreakpointObserver,
    private router: Router) { }

  public ngOnInit(): void {
    this.breakpointObserver
    .observe(['(max-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if(state.matches){
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
    });
  }
}
