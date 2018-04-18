import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewsRoutingModule, interviewsRouterComponent } from './interviews.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewControllerService } from '../api/services/interview-controller.service'; 
import { TableHeadComponent } from './interview-list/table-head/table-head.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeIntervalComponent } from './time-interval/time-interval.component';

@NgModule({
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    interviewsRouterComponent,
    TableHeadComponent,
    TimeIntervalComponent
  ],
  providers: [
    InterviewControllerService
  ]
})
export class InterviewsModule { }
