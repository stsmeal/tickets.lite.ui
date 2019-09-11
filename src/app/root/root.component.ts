import { Component, AfterContentInit } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { StartComponent } from '../start/start.component';
import { TicketsMainComponent } from '../tickets/main/tickets-main.component';

@Component({
    template: `
    <ng-template [cdkPortalOutlet]="comp"></ng-template>
    `
})
export class RootComponent implements AfterContentInit{
    public comp: Portal<any>;
    
    private startComponent: ComponentPortal<StartComponent>;
    private ticketMainComponent: ComponentPortal<TicketsMainComponent>;

    constructor(private auth: AuthService){ }

    public ngAfterContentInit(): void {
        if(this.auth.isAuthenticated){
            this.ticketMainComponent = new ComponentPortal(TicketsMainComponent);
            this.comp = this.ticketMainComponent;
        } else {
            this.startComponent = new ComponentPortal(StartComponent);
            this.comp = this.startComponent;
        }
    }
}