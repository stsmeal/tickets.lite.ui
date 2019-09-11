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

const routes: Routes = [
  { path: '', component: RootComponent},
  { path: 'tickets', component: TicketsMainComponent, canActivate: [AuthGuard] },
  { path: 'tickets/new', component: TicketEditComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketEditComponent, canActivate: [AuthGuard] },
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
    TicketNotesPortalComponent
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
