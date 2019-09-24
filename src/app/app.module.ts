import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';

import { RootComponent } from './root/root.component';
import { StartComponent } from './start/start.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { TicketsMainComponent } from './tickets/main/tickets-main.component';
import { TicketEditComponent } from './tickets/edit/ticket-edit.component';
import { DateTimeInputComponent } from './shared/datetime-input.component';
import { DateInputComponent } from './shared/date-input.component';
import { GridComponent } from './shared/grid/grid.component';
import { ModalComponent } from './shared/modal.component';
import { PortalComponent } from './shared/portal/portal.component';
import { TicketNotesPortalComponent } from './tickets/edit/portals/ticket-notes/ticket-notes.component';
import { AssignmentsPortalComponent } from './tickets/edit/portals/assignments/assignments-portal.component';
import { LaborChargePortalComponent } from './tickets/edit/portals/labor-charges/labor-charge-portal.component';
import { AssetsMainComponent } from './inventory/main/assets-main.component';
import { AssetEditComponent } from './inventory/edit/asset-edit.component';
import { UsersMainComponent } from './users/main/users-main.component';
import { UserEditComponent } from './users/edit/user-edit.component';
import { AssetsPortalComponent } from './tickets/edit/portals/assets/assets-portal.component';
import { UserLaborChargesPortalComponent } from './users/edit/portals/labor-charges/user-labor-charges-portal.component';
import { UserTicketsPortalComponent } from './users/edit/portals/tickets/user-tickets-portal.component';

const routes: Routes = [
  { path: '', component: RootComponent},
  { path: 'tickets', component: TicketsMainComponent, canActivate: [AuthGuard] },
  { path: 'tickets/new', component: TicketEditComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketEditComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: AssetsMainComponent, canActivate: [AuthGuard] },
  { path: 'inventory/new', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: 'inventory/:id', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersMainComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: LogInComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    StartComponent,
    SignInComponent,
    LogInComponent,
    TicketsMainComponent,
    TicketEditComponent,
    DateInputComponent,
    DateTimeInputComponent,
    GridComponent,
    ModalComponent,
    PortalComponent,
    TicketNotesPortalComponent,
    AssignmentsPortalComponent,
    LaborChargePortalComponent,
    AssetsPortalComponent,
    AssetsMainComponent,
    AssetEditComponent,
    UsersMainComponent,
    UserEditComponent,
    UserLaborChargesPortalComponent,
    UserTicketsPortalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StartComponent]
})
export class AppModule { }
