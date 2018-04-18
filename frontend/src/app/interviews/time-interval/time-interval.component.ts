import { Component, OnInit, ChangeDetectorRef, forwardRef, Input } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimeInterval } from '../model/date-time-interval';
import { getSeconds, getHours, getMinutes, getDay, getMonth, getYear, getDate } from 'date-fns';

const now = new Date();

export const TIME_INTERVAL_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeIntervalComponent),
  multi: true
};

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.css'],
  providers: [NgbDatepickerConfig, TIME_INTERVAL_CONTROL_VALUE_ACCESSOR]
})
export class TimeIntervalComponent implements ControlValueAccessor {

  @Input() interval: DateTimeInterval = {
    startDate: new Date(),
    endDate: new Date()
  };

  dateModel: NgbDateStruct = {
    day: getDate(now),
    month: getMonth(now) + 1,
    year: getYear(now)
  };
  startTimeModel: NgbTimeStruct = {
    second: 0,
    hour: getHours(now) + 1,
    minute: 0
  };
  endTimeModel: NgbTimeStruct = {
    second: 0,
    hour: getHours(now) + 2,
    minute: 0
  };
  date: { year: number, month: number };
  minDate: NgbDateStruct = {
    day: getDate(now),
    month: getMonth(now) + 1,
    year: getYear(now)
  };

  onTouched = () => {};

  selectToday() {
    this.dateModel = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  private onChangeCallback: (interval: DateTimeInterval) => void = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  writeValue(interval: DateTimeInterval): void {
    if (interval) {
      this.interval = interval;
    } 
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void { 
    this.onTouched = fn;
  }

  refreshDate() {
    // if (this.startTimeModel.hour > this.endTimeModel.hour) {
    //   this.startTimeModel = {
    //     hour: this.endTimeModel.hour,
    //     second: 0,
    //     minute: 0
    //   };
    // }
    let stringDate = this.dateModel.year + "/" + (this.dateModel.month) + "/" + this.dateModel.day;
    this.interval.startDate = new Date(stringDate);
    this.interval.endDate = new Date(stringDate);
    this.interval.startDate.setHours(this.startTimeModel.hour);
    this.interval.startDate.setMinutes(this.startTimeModel.minute);
    this.interval.endDate.setHours(this.endTimeModel.hour);
    this.interval.endDate.setMinutes(this.endTimeModel.minute);
    this.interval.startStringDate = this.convertDateToString(this.interval.startDate);
    this.interval.endStringDate = this.convertDateToString(this.interval.endDate);
    this.onChangeCallback(this.interval);
  }

  convertDateToString(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

}
