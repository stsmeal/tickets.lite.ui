import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Asset } from 'src/app/models/asset';
import { InventoryService } from '../inventory.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    templateUrl: 'asset-edit.component.html'
})
export class AssetEditComponent implements OnInit {
    public isEdit: boolean = false;
    public loading: boolean = false;
    public asset: Asset = new Asset();


    constructor(
        public inventoryService: InventoryService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private notification: NotificationService) {}

        
    public ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params: ParamMap) =>{
                if(params.has('id')){
                    this.isEdit = true;
                    this.loading = true;
                    this.inventoryService.getAsset(params.get('id')).subscribe(
                        (asset: Asset) => {
                            this.asset = asset;
                            this.loading = false;
                        },
                        (error) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )
                } else {
                    this.asset = new Asset();
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
                this.notification.success('Asset saved');
                this.route.paramMap.subscribe(
                    (params: ParamMap) =>{
                        if(!params.has('id')){
                            this.router.navigateByUrl('inventory/' + asset._id);
                        } else {
                            this.asset = asset;
                            this.loading = false;
                        }
                    });
            },
            (error) => {
                console.log(error);
                this.loading = false;
                this.notification.error('Error while saving asset');
            }
        );
    }

    

    public delete(): void {
        this.loading = true;
        this.inventoryService.deleteAsset(this.asset._id).subscribe(
            (asset: Asset) => {
                if(asset){
                    this.router.navigateByUrl('inventory');
                } else {
                    this.asset = asset;
                    this.notification.error('Error while deleting asset');
                }
                this.loading = false;
            }, 
            (error) => {
                console.log(error);
                this.loading = false;
                this.notification.error('Error while deleting asset');
            }
        );
    }
}