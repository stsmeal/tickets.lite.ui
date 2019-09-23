import { Component, ViewChild, OnInit } from "@angular/core";
import { Asset } from 'src/app/models/asset';
import { GridColumn } from 'src/app/models/grid-column';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
    templateUrl: 'assets-main.component.html'
})
export class AssetsMainComponent implements OnInit {
    public loading: boolean = false;
    public filter: string = '';
    public assets: Asset[];

    public columns: GridColumn[];


    constructor(
        private inventoryService: InventoryService,
        private router: Router) { }

    public ngOnInit(): void {
        this.loading = true;
        this.columns = this.inventoryService.getColumns();
        this.inventoryService.getInventory().subscribe(
            (assets) => {
                this.assets = assets;
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    public selection(asset: Asset): void {
        this.router.navigateByUrl('/inventory/'+asset._id);
    }
}