import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from '../tenant.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { cloneDeep } from 'lodash';

@Component({
    templateUrl: 'tenant-edit.component.html'
})
export class TenantEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public tenant: Tenant = new Tenant();

    private oTenant: Tenant = new Tenant();


    constructor(
        public tenantService: TenantService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alert: AlertService) {}

        
    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) =>{
                if(params.has('id')){
                    this.isEdit = true;
                    this.loading = true;
                    this.tenantService.getTenant(params.get('id')).subscribe(
                        (tenant: Tenant) => {
                            this.tenant = tenant;
                            this.oTenant = cloneDeep(tenant);
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.tenant = new Tenant();
                    this.oTenant = new Tenant();
                }
            }
        );
    }

    public save(): void {
        this.loading = true;
        this.tenantService.saveTenant(this.tenant).subscribe(
            (tenant: Tenant) => {
                this.alert.success('Tenant saved');
                this.route.paramMap.subscribe(
                    (params: ParamMap) =>{
                        if(!params.has('id')){
                            this.router.navigateByUrl('tenants/' + tenant._id);
                        } else {
                            this.tenant = tenant;
                            this.oTenant = cloneDeep(tenant);
                            this.loading = false;
                        }
                    });
            },
            (error) => {
                console.log(error);
                this.loading = false;
                this.alert.error('Error while saving tenant');
            }
        );
    }

    public close(): void {
        if(JSON.stringify(this.tenant) == JSON.stringify(this.oTenant)){
            this.router.navigateByUrl('tenants');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.router.navigateByUrl('tenants');
                    }
                }
            );
        }
    }
}