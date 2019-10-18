import { Injectable } from "@angular/core";
import { GridColumn } from '../models/grid-column';
import { Tenant } from '../models/tenant';
import { Observable } from 'rxjs';
import { QueryCriteria } from '../models/query';
import { ApiService } from '../services/api.service';
import { TenantInfo } from '../models/tenant-info';
import { ModalService } from '../services/modal.service';
import { TenantNotificationModalComponent } from './tenant-notification-modal/tenant-notification-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class TenantService {
    private readonly columns: GridColumn[] = [
        <GridColumn>{
            name: 'site',
            label: 'Site',
            formatter: (tenant: Tenant) => {
                return tenant.site;
            }
        },
        <GridColumn>{
            name: 'companyName',
            label: 'Company Name',
            formatter: (tenant: Tenant) => {
                return tenant.companyName;
            }
        },
        <GridColumn>{
            name: 'description',
            label: 'Description',
            formatter: (tenant: Tenant) => {
                return tenant.description;
            }
        },
        <GridColumn>{
            name: 'accountActive',
            label: 'Active',
            formatter: (tenant: Tenant) => {
                return (tenant.accountActive) ? 'Yes' : 'No';
            }
        },
        <GridColumn>{
            name: 'dateCreated',
            label: 'Date Created',
            formatter: (tenant: Tenant) => {
                if(tenant.dateCreated){
                    return (new Date(tenant.dateCreated)).toLocaleString();
                } else {
                    return '';
                }
            }
        }
    ];

    constructor(
        private api: ApiService,
        private modalService: ModalService) { }

    public getColumns(): GridColumn[] {
        return this.columns;
    }

    public getTenant(id: string): Observable<Tenant> {
        return this.api.get('tenants/'+id);
    }

    public getTenantInfo(id: string): Observable<TenantInfo> {
        return this.api.get('tenants/info/'+id);
    }

    public saveTenant(tenant: Tenant): Observable<Tenant> {
        return this.api.post('tenants', tenant);
    }

    public openSendNotification(id?: string): MatDialogRef<TenantNotificationModalComponent, any> {
        return this.modalService.open(TenantNotificationModalComponent, {width: '800px', data: {id: id}});
    }

    public sendTenantNotification(tenantId: string, message: string): Observable<boolean>{
        return this.api.post('tenants/notification', {id: tenantId, message: message});
    }

    public query(queryCriteria: QueryCriteria): Observable<Tenant[]>{
        return this.api.post('tenants/query', queryCriteria);
    }
}