import { Component, ViewChild, OnInit } from "@angular/core";
import { Asset } from 'src/app/models/asset';
import { GridColumn } from 'src/app/models/grid-column';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
    templateUrl: 'assets-main.component.html'
})
export class AssetsMainComponent implements OnInit {
    public loading: boolean = true;
    public assets: Asset[];
    public routeLink = (asset: Asset): string => {
        return "/inventory/"+asset._id;
    }

    public query = (queryCriteria) => {
        return this.inventoryService.query(queryCriteria);
    }

    public columns: GridColumn[];


    constructor(
        private inventoryService: InventoryService,
        private router: Router) { }

    public ngOnInit(): void {
        this.columns = this.inventoryService.getColumns();
    }

    public selection(asset: Asset): void {
        this.router.navigateByUrl('/inventory/'+asset._id);
    }
}