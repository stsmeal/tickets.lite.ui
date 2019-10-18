import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from '../tenant.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { cloneDeep } from 'lodash';
import { TenantInfo } from 'src/app/models/tenant-info';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
    templateUrl: 'tenant-edit.component.html'
})
export class TenantEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public tenant: Tenant = new Tenant();
    public info: TenantInfo = new TenantInfo();

    public lineChartOptions: (ChartOptions & { annotation?: any }) = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(120, 144, 156, 0.3)',
        },
        {
            borderColor: 'blue',
            backgroundColor: 'rgba(138, 216, 255, 0.3)',
        },
        {
            borderColor: 'green',
            backgroundColor: 'rgba(99, 255, 80, 0.3)',
        },
    ];

    public lineChartLegend = true;
    public lineChartType = 'line';

    private oTenant: Tenant = new Tenant();

    constructor(
        public tenantService: TenantService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alert: AlertService) { }


    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                if (params.has('id')) {
                    this.isEdit = true;
                    this.loading = true;
                    this.tenantService.getTenant(params.get('id')).subscribe(
                        (tenant: Tenant) => {
                            this.tenantService.getTenantInfo(tenant._id).subscribe(
                                (info: TenantInfo) => {
                                    this.info = info;
                                    this.loading = false;
                                },
                                (error) => {
                                    console.log(error);
                                    this.loading = false;
                                }
                            );
                            this.tenant = tenant;
                            this.oTenant = cloneDeep(tenant);
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
                    (params: ParamMap) => {
                        if (!params.has('id')) {
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
        if (JSON.stringify(this.tenant) == JSON.stringify(this.oTenant)) {
            this.router.navigateByUrl('tenants');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if (response) {
                        this.router.navigateByUrl('tenants');
                    }
                }
            );
        }
    }
}