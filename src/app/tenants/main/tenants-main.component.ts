import { Component, ViewChild, OnInit } from "@angular/core";
import { GridColumn } from 'src/app/models/grid-column';
import { Router } from '@angular/router';
import { TenantService } from '../tenant.service';
import { Tenant } from 'src/app/models/tenant';

@Component({
    templateUrl: 'tenants-main.component.html'
})
export class TenantsMainComponent implements OnInit {
    public filter: string = '';
    public loading: boolean = true;
    public routeLink = (tenant: Tenant): string => {
        return '/tenants/'+tenant._id;
    }

    public query = (queryCriteria) => {
        return this.tenantService.query(queryCriteria);
    }

    public columns: GridColumn[];

    constructor(
        public tenantService: TenantService,
        private router: Router) { }

    public ngOnInit(): void {
        this.columns = this.tenantService.getColumns();
    }

    public selection(tenant: Tenant): void {
        this.router.navigateByUrl('/tenants/'+tenant._id);
    }
}