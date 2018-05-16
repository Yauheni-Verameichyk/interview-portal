import { Component, OnInit, OnDestroy } from '@angular/core';
import { InterviewFormService } from './service/interview-form.service';
import { DateTimeInterval } from '../model/date-time-interval';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Candidate } from '../../api/models/candidate';
import { CandidateBaseInfoDTO } from '../../api/models/candidate-base-info-dto';
import { DisciplineDTO } from '../../api/models/discipline-dto';
import { UserBaseInfoDTO } from '../../api/models/user-base-info-dto';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css'],
  providers: [InterviewFormService]
})
export class InterviewFormComponent implements OnInit, OnDestroy {

  refresh: Subject<any> = new Subject();

  constructor(private interviewFormService: InterviewFormService) { }

  ngOnInit() {
    this.interviewFormService.initInterviewForm();
    document.body.style.overflowY = 'hidden';
  }

  get formTitle(): string {
    return this.interviewFormService.formTitle;
  }

  get interval(): DateTimeInterval {
    return this.interviewFormService.interval;
  }

  get interviewForm(): FormGroup {
    return this.interviewFormService.interviewForm;
  }

  get isDisciplineDisplay(): boolean {
    return this.interviewFormService.isDisciplineDisplay;
  }

  get isInterviewersDisplay(): boolean {
    return this.interviewFormService.isInterviewersDisplay;
  }

  get isSaveButtonDisplay(): boolean {
    return this.interviewFormService.isSaveButtonDisplay;
  }

  get interviewerList(): Array<UserBaseInfoDTO> {
    return this.interviewFormService.interviewerList;
  }

  get disciplines(): DisciplineDTO[] {
    return this.interviewFormService.disciplines;
  }

  get isInterviewerView(): boolean {
    return this.interviewFormService.isInterviewView;
  }

  get isStatusDisplay(): boolean {
    return this.interviewFormService.isStatusDisplay;
  }

  get isNewInterview(): boolean {
    return this.interviewFormService.isNewInterview;
  }

  ngOnDestroy(): void {
    document.body.style.overflowY = 'scroll';
  }

}
