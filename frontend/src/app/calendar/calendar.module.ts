import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from '../api/api.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { calendarRouterComponents, CalendarRoutingModule } from './calendar.routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from './service/calendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { CalendarDeleteFormComponent } from './calendar-delete-form/calendar-delete-form.component';


@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    CalendarModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    calendarRouterComponents,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarFormComponent,
    CalendarDeleteFormComponent
  ],
  providers: [
    CalendarService
  ]
})
export class CustomCalendarModule { }
