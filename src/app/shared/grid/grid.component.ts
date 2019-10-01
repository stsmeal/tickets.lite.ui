import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, SimpleChange, AfterViewInit } from "@angular/core";
import { GridColumn } from 'src/app/models/grid-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { QueryCriteria } from 'src/app/models/query';

@Component({
    selector: 'grid',
    templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() data: any;
    @Input() columns: GridColumn[];
    @Input() filter: string = '';
    @Input() routeLinkFn: (item: any) => string;
    @Input() queryFn: (qc: QueryCriteria) => any;

    @Output() columnsChange: EventEmitter<GridColumn[]> = new EventEmitter<GridColumn[]>();
    @Output() selection: EventEmitter<any> = new EventEmitter<any[]>();

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public loading: boolean = false;
    public total: number;

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

    public ngAfterViewInit(): void {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.loading = true;
              let queryCriteria: QueryCriteria = <QueryCriteria>{
                  sortColumn: this.sort.active,
                  sortDirection: this.sort.direction,
                  page: this.paginator.pageIndex,
                  pageSize: this.paginator.pageSize
              };
              return this.queryFn(queryCriteria);
            }),
            map((data: any) => {
              // Flip flag to show that loading has finished.
              this.loading = false;
              this.total = data.total;
    
              return data.items;
            }),
            catchError((error) => {
              this.loading = false;
              // Catch if the GitHub API has reached its rate limit. Return empty data.
              return observableOf([]);
            })
          ).subscribe(data => { 
              this.data = data;
              this.source = new MatTableDataSource(data);
          });
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