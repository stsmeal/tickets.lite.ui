export class GridColumn {
    name: string;
    label: string;
    formatter: (data: any) => string;
}