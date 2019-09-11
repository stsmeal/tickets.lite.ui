import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-input',
  template: `
<mat-form-field style="width: 100%; padding-top: 1px;">
  <input matInput [max]="max" [matDatepicker]="picker" [disabled]="disabled" [placeholder]="label" (dateChange)="handleChange($event)" [(ngModel)]="value">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
    `
})
export class DateInputComponent {
  @Input() label: string = "Date";
  @Input() max: Date = null;
  @Input() disabled: boolean = false;
  @Input() isDateDisabled: (date: Date) => boolean = (date: Date): boolean => false;
  @Input() value: Date = null;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {
    if (this.value) {
      this.value = new Date(this.value.toString());
    }
  }

  public prevent(e: any, date: Date): void {
    if (this.isDateDisabled(date)) {
      e.stopPropagation();
    }
  }

  public handleChange(date: Date): void {
    //this.value = this.isDateDisabled(date) ? null : date;
    this.valueChange.emit(this.value);
  }
}
