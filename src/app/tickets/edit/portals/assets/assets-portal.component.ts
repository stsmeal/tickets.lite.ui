import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Asset } from 'src/app/models/asset';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'assets-portal',
    templateUrl: 'assets-portal.component.html'
})
export class AssetsPortalComponent {
    @Input()
    get assets(): Asset[] {
        return this._assets;
    }
    set assets(val: Asset[]) {
        this._assets = val;
        this.assetsChange.emit(this._assets);
    }

    @Output() assetsChange: EventEmitter<Asset[]> = new EventEmitter<Asset[]>();
    @Output() open: EventEmitter<Asset> = new EventEmitter<Asset>();

    public searchText: string;
    public searchAssets: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);

    private _assets: Asset[];

    private subscriber: Subscription = new Subscription();

    constructor(
        private inventoryService: InventoryService
    ) { }


    public change(): void {
        if(this.searchText && this.searchText.length > 0){
            this.subscriber.unsubscribe();
            this.subscriber = this.inventoryService.assetQuickSearch(this.searchText).subscribe(
                (assets: Asset[]) => {
                    assets = assets.filter(u => this.assets.findIndex(a => a._id == u._id) == -1);
                    this.searchAssets.next(assets);
            }, (error) => {
                console.log(error);
                this.searchAssets.next([]);
            });
        } else {
            this.searchAssets.next([]);
        }
    }

    public selection(event: MatAutocompleteSelectedEvent): void {
        let asset = <Asset>event.option.value;
        this.assets.push(asset);
        this.assets = this.assets.slice();
        this.searchText = "";
        this.searchAssets.next([]);
    }

    public delete(asset: Asset): void {
        let ix = this.assets.findIndex(a => a._id == asset._id);
        if(ix > -1){
            this.assets.splice(ix, 1);
            this.assets = this.assets.slice();
        }
    }

    public edit(asset?: Asset): void {
        if(asset){
            this.open.emit(asset);
        }
    }
}