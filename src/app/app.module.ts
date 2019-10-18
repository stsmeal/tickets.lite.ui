import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminGuardService as AdminGuard } from './services/admin-guard.service';

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
import { NotesPortalComponent } from './shared/notes-portal/notes-portal.component';
import { AssignmentsPortalComponent } from './tickets/edit/portals/assignments/assignments-portal.component';
import { LaborChargePortalComponent } from './tickets/edit/portals/labor-charges/labor-charge-portal.component';
import { AssetsMainComponent } from './inventory/main/assets-main.component';
import { AssetEditComponent } from './inventory/edit/asset-edit.component';
import { UsersMainComponent } from './users/main/users-main.component';
import { UserEditComponent } from './users/edit/user-edit.component';
import { AssetsPortalComponent } from './tickets/edit/portals/assets/assets-portal.component';
import { UserLaborChargesPortalComponent } from './users/edit/portals/labor-charges/user-labor-charges-portal.component';
import { UserTicketsPortalComponent } from './users/edit/portals/tickets/user-tickets-portal.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { SettingsMenuComponent } from './shared/settings-menu/settings-menu.component';
import { CreateWorkplaceComponent } from './create-workplace/create-workplace.component';
import { NotificationToolbarButtonComponent } from './notifications/notification-toolbar-button.component';
import { NotificationsMainComponent } from './notifications/main/notifications-main.component';
import { TenantsMainComponent } from './tenants/main/tenants-main.component';
import { TenantEditComponent } from './tenants/edit/tenant-edit.component';
import { TenantNotificationModalComponent } from './tenants/tenant-notification-modal/tenant-notification-modal.component';

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
  { path: 'sign-in', component: LogInComponent },
  { path: 'create-workplace', component: CreateWorkplaceComponent },
  { path: 'notifications', component: NotificationsMainComponent },
  { path: 'tenants', component: TenantsMainComponent, canActivate: [AdminGuard]},
  { path: 'tenants/:id', component: TenantEditComponent, canActivate: [AdminGuard]}
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
    NotesPortalComponent,
    AssignmentsPortalComponent,
    LaborChargePortalComponent,
    AssetsPortalComponent,
    AssetsMainComponent,
    AssetEditComponent,
    UsersMainComponent,
    UserEditComponent,
    UserLaborChargesPortalComponent,
    UserTicketsPortalComponent,
    ConfirmModalComponent,
    SettingsMenuComponent,
    CreateWorkplaceComponent,
    NotificationToolbarButtonComponent,
    NotificationsMainComponent,
    TenantsMainComponent,
    TenantEditComponent,
    TenantNotificationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StartComponent, ConfirmModalComponent, TenantNotificationModalComponent]
})
export class AppModule { }
