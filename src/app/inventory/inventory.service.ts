import { Injectable } from "@angular/core";
import { GridColumn } from '../models/grid-column';
import { Asset } from '../models/asset';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    public readonly statuses = [
        {id: 1, label: 'Active' },
        {id: 2, label: 'Existing' },
        {id: 3, label: 'Broken' },
        {id: 4, label: 'D.N.E.' },
        {id: 5, label: 'Other' },
    ];

    public readonly categories = [
        {id: 1, label: 'Tool' },
        {id: 2, label: 'Vehicle' },
        {id: 3, label: 'Part' },
        {id: 4, label: 'Human' },
        {id: 5, label: 'Other' },
    ];

    private readonly columns: GridColumn[] = [
        <GridColumn>{
            name: 'number',
            label: 'Number',
            formatter: (asset: Asset) => {
                return asset.number;
            }
        },
        <GridColumn>{
            name: 'description',
            label: 'Description',
            formatter: (asset: Asset) => {
                return asset.description;
            }
        },
        <GridColumn>{
            name: 'status',
            label: 'Status',
            formatter: (asset: Asset) => {
                let status = this.statuses.find(s => s.id == asset.status);
                if(status){
                    return status.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'category',
            label: 'Category',
            formatter: (asset: Asset) => {
                let category = this.categories.find(s => s.id == asset.category);
                if(category){
                    return category.label;
                } else {
                    return '';
                }
            }
        },
        <GridColumn>{
            name: 'dateCreated',
            label: 'Date Created',
            formatter: (asset: Asset) => {
                if(asset.dateCreated){
                    return (new Date(asset.dateCreated)).toLocaleString();
                } else {
                    return '';
                }
            }
        }
    ];

    constructor(private api: ApiService){}

    public getColumns(): GridColumn[] {
        return this.columns;
    }

    public getInventory(): Observable<Asset[]> {
        return this.api.get('inventory');
    }

    public getAsset(id: string): Observable<Asset> {
        return this.api.get('inventory/'+id);
    }

    public saveAsset(asset: Asset): Observable<Asset> {
        return this.api.post('inventory', asset);
    }
    
    public deleteAsset(id: string): Observable<Asset> {
        return this.api.delete('inventory/'+id);
    }

    public assetQuickSearch(searchText: string) {
        return this.api.post('inventory/quicksearch', {searchText: searchText});
    }
}