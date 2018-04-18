import { Component, OnInit, OnDestroy } from '@angular/core';
import { InterviewFormService } from './service/interview-form.service';
import { DateTimeInterval } from '../model/date-time-interval';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css'],
  providers: [InterviewFormService]
})
export class InterviewFormComponent implements OnInit, OnDestroy {

  refresh: Subject<any> = new Subject();
  public interval: DateTimeInterval;

  constructor(private interviewFormService: InterviewFormService) {
  }

  ngOnInit() {
    this.interviewFormService.initInterviewForm();
    document.body.style.overflowY = 'hidden';
  }

  get formTitle(): string {
    return this.interviewFormService.formTitle;
  }

  a() {
    console.log(this.interval.startStringDate + " - " + this.interval.endStringDate);
  }

  ngOnDestroy(): void {
    document.body.style.overflowY = 'scroll';
  }

}
