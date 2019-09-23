import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'datetime-input',
  template: `
  <div class="row">
    <div class="col-6">
      <date-input [label]="label"
                    [max]="max"
                    [value]="value"
                    [disabled]="disabled || dateInputDisabled"
                    [isDateDisabled]="isDateDisabled"
                    (valueChange)="handleDateChange($event)"></date-input>
    </div>
    <div class="col-6">
      <mat-form-field style="width: 100%">
        <input matInput type="time" step="900" (change)="handleTimeChange($event?.srcElement?.valueAsDate)" [disabled]="disabled || timeInputDisabled || !value">
      </mat-form-field>
    </div>
  </div>
    `
})
export class DateTimeInputComponent {
  @Input() label: string = "Date";
  @Input() max: Date = null;
  @Input() disabled: boolean = false;
  @Input() dateInputDisabled: boolean = false;
  @Input() timeInputDisabled: boolean = false;
  @Input() isDateDisabled: (date: Date) => boolean = (date: Date): boolean => false;
  @Input() value: Date;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  public handleDateChange(date: Date): void {
    // must preserve time value because kendo datepicker used in fsi-date-input will overwrite it
    let reapplyTime: boolean = false;
    let hours: number;
    let minutes: number;

    if (this.value) {
      reapplyTime = true;
      hours = this.value.getHours();
      minutes = this.value.getMinutes();
    }

    this.value = date;

    if (reapplyTime) {
      if (date != null) {
        this.value.setHours(hours);
        this.value.setMinutes(minutes);
      }
    }

    this.valueChange.emit(this.value);
  }

  public handleTimeChange(date: Date): void {
    // fsi-time-input is completely custom and does not overwrite the date
    if(this.value){
      if(date){
        this.value.setHours(date.getHours());
        this.value.setMinutes(date.getMinutes()); 
      } else {
        this.value.setHours(0);
        this.value.setMinutes(0);
      }
    } else {
      this.value = date;
    }
    
    this.valueChange.emit(this.value);
  }
}
