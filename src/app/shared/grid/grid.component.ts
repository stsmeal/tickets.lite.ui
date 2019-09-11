import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, SimpleChange } from "@angular/core";
import { GridColumn } from 'src/app/models/grid-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'grid',
    templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() columns: GridColumn[];
    @Input() filter: string = '';

    @Output() columnsChange: EventEmitter<GridColumn[]> = new EventEmitter<GridColumn[]>();
    @Output() selection: EventEmitter<any> = new EventEmitter<any[]>();

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    get displayedColumns(): string[] {
        return this.columns.map(c => c.name);
    }

    public source: MatTableDataSource<any>;
    

    constructor() {}

    public ngOnInit(): void {
        this.columns = this.columns;
        this.source = new MatTableDataSource(this.data);
        this.source.sortingDataAccessor = (data: any, name: string): string => {
            let column = this.columns.find(c => c.name == name);
            if(column){
                return column.formatter(data);
            } else {
                return "";
            }
        }
        this.source.sort = this.sort;
        this.source.filter = this.filter.trim().toLowerCase();
        this.source.filterPredicate = (data: any, filter: string): boolean => {
            let hasFilter = false;

            for(let column of this.columns){
                if((column.formatter(data) || '').toLowerCase().includes(filter)){
                    hasFilter = true;
                }
            }

            return hasFilter;
        }
    }

    public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['data'] && !changes['data'].firstChange && changes['data'].currentValue !== changes['data'].previousValue){
            this.source.data = changes['data'].currentValue;
        }

        if(changes['filter'] && !changes['filter'].firstChange && changes['filter'].currentValue !== changes['filter'].previousValue){
            this.source.filter = changes['filter'].currentValue.trim().toLowerCase();
            this.filter = changes['filter'].currentValue.trim().toLowerCase();
        }
    }

    public getCell(data: any, name: string): string {
        let column = this.columns.find(c => c.name == name);
        if(column){
            return column.formatter(data);
        } else {
            return "";
        }
    }
    
    public select(data: any): void{
        this.selection.emit(data);
    }
}