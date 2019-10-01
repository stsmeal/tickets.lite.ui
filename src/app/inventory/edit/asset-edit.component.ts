import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Asset } from 'src/app/models/asset';
import { InventoryService } from '../inventory.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { cloneDeep } from 'lodash';

@Component({
    templateUrl: 'asset-edit.component.html'
})
export class AssetEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public asset: Asset = new Asset();

    private oAsset: Asset = new Asset();


    constructor(
        public inventoryService: InventoryService,
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
                    this.inventoryService.getAsset(params.get('id')).subscribe(
                        (asset: Asset) => {
                            this.asset = asset;
                            this.oAsset = cloneDeep(asset);
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.asset = new Asset();
                    this.oAsset = new Asset();
                }
            }
        );
    }

    public save(): void {
        this.loading = true;
        this.asset.dateCreated = new Date();
        this.asset.userCreated = this.auth.user;
        this.inventoryService.saveAsset(this.asset).subscribe(
            (asset: Asset) => {
                this.alert.success('Asset saved');
                this.route.paramMap.subscribe(
                    (params: ParamMap) =>{
                        if(!params.has('id')){
                            this.router.navigateByUrl('inventory/' + asset._id);
                        } else {
                            this.asset = asset;
                            this.oAsset = cloneDeep(asset);
                            this.loading = false;
                        }
                    });
            },
            (error) => {
                console.log(error);
                this.loading = false;
                this.alert.error('Error while saving asset');
            }
        );
    }

    public openNew(): void {
        if(JSON.stringify(this.asset) == JSON.stringify(this.oAsset)){
            this.router.navigateByUrl('inventory/new');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.router.navigateByUrl('inventory/new');
                    }
                }
            );
        }
    }

    public delete(): void {
        this.alert.confirm('Are you sure you want to delete this asset?').subscribe(
            (response: boolean) => {
                if(response){
                    this.loading = true;
                    this.inventoryService.deleteAsset(this.asset._id).subscribe(
                        (asset: Asset) => {
                            if(asset){
                                this.router.navigateByUrl('inventory');
                            } else {
                                this.asset = asset;
                                this.alert.error('Error while deleting asset');
                            }
                            this.loading = false;
                        }, 
                        (error) => {
                            console.log(error);
                            this.loading = false;
                            this.alert.error('Error while deleting asset');
                        }
                    );
                }
            }
        );
    }

    public close(): void {
        if(JSON.stringify(this.asset) == JSON.stringify(this.oAsset)){
            this.router.navigateByUrl('inventory');
        } else {
            this.alert.confirm('There are unsaved changes. Are you sure you want to leave?').subscribe(
                (response: boolean) => {
                    if(response){
                        this.router.navigateByUrl('inventory');
                    }
                }
            );
        }
    }
}