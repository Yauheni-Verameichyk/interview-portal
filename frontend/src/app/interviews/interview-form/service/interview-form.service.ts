import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DateTimeInterval } from '../../model/date-time-interval';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { InterviewDTO } from '../../../api/models/interview-dto';
import { FullInterviewInfoDTO } from '../../../api/models/full-interview-info-dto';
import { CandidateBaseInfoDTO } from '../../../api/models/candidate-base-info-dto';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { DisciplineBaseInfoDTO } from '../../../api/models/discipline-base-info-dto';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { InterviewControllerService } from '../../../api/services/interview-controller.service';
import { PopupService } from '../../../shared/pop-up-window/popup-service/popup.service';
import { LightFieldService } from '../../../shared/validator/service/light-field.service';
import { InterviewersComponent } from '../interviewers/interviewers.component';
import { DisciplineControllerService } from '../../../api/services/discipline-controller.service';
import { UserControllerService } from '../../../api/services/user-controller.service';
import { InterviewStatus } from '../../../api/models/interview-status';
import { InterviewDisciplineDTO } from '../../../api/models/interview-discipline-dto';

@Injectable()
export class InterviewFormService {

  public interview: FullInterviewInfoDTO;
  public disciplines: InterviewDisciplineDTO[] = [];

  private emptyInterview: FullInterviewInfoDTO = {
    candidate: new CandidateBaseInfoDTO(),
    disciplineSet: [new DisciplineBaseInfoDTO()],
    interviewerSet: [new UserBaseInfoDTO()],
    status: new InterviewStatus()
  };

  public interval: DateTimeInterval = new DateTimeInterval();
  public interviewerList: Array<UserBaseInfoDTO> = [];
  public tempInterviewList: Array<UserBaseInfoDTO>;
  public interviewForm: FormGroup;
  public isDisciplineDisplay: boolean = false;
  public isInterviewersDisplay: boolean = false;
  public isSaveButtonDisplay: boolean = false;
  public isNewInterview: boolean = false;
  public isInterviewView: boolean = false;
  public isStatusDisplay: boolean = true;
  private operation: string = '';

  private readonly INTERVIEW_FORM_CONFIG = {
    'interview-create': {
      formTitle: 'Add interview',
      initMethod: () => this.interviewForm.enable(),
      isElementsShow: () => this.elementsCreateShow(),
      saveMethod: (interview) => this.interviewControllerService.addUsingPOST_1(interview),
      successfullySaveMessage: "Interview was successfully created!!!",
      notSuccessfullySaveMessage: "Could not create interview! Try later!"
    },
    'interview-view': {
      formTitle: 'View interview',
      initMethod: () => this.interviewForm.disable(),
      isElementsShow: () => this.elementsViewShow()
    },
    'interview-update': {
      formTitle: 'Interview Info',
      initMethod: () => this.interviewForm.enable(),
      isElementsShow: () => this.elementsUpdateShow(),
      saveMethod: (interview) => this.interviewControllerService.updateUsingPUT_1(interview),
      successfullySaveMessage: "Interview was successfully updated!!!",
      notSuccessfullySaveMessage: "Could not update interview! Try later!"
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userControllerService: UserControllerService,
    private interviewControllerService: InterviewControllerService,
    private popupService: PopupService,
    private lightFieldService: LightFieldService) { }

  get formTitle(): string {
    return this.INTERVIEW_FORM_CONFIG[this.operation].formTitle;
  }

  elementsViewShow() {
    this.isInterviewView = true;
  }

  elementsCreateShow() {
    this.isStatusDisplay = false;
    this.isNewInterview = true;
  }

  elementsUpdateShow() {
    this.isSaveButtonDisplay = true;
  }

  setInterviewerList(interview: FullInterviewInfoDTO) {
    this.userControllerService
      .findByDisciplineAndTimeRangeUsingGET({
        disciplineId: this.interview.disciplineSet[0].id,
        rangeEnd: this.interview.endTime,
        rangeStart: this.interview.startTime
      })
      .subscribe(interviewerList => {
        this.interviewerList = this.interview.interviewerSet;
        Array.prototype.push.apply(this.interviewerList, interviewerList);
      });
  }

  initInterviewForm() {
    this.route.snapshot.url.forEach(element => {
      if (this.INTERVIEW_FORM_CONFIG[element.path]) {
        this.operation = element.path;
      }
    });
    this.interview = this.route.snapshot.data['interview'];
    if (this.interview) {
      this.tempInterviewList = Array.from(this.interview.interviewerSet);
      this.disciplines = this.interview.candidate.disciplineList;
      this.showDiscipline();
      this.isInterviewersDisplay = true;
      this.setInterviewerList(this.interview);
    }
    this.initTimeInterval();
    this.interview = !this.interview ? this.emptyInterview : this.interview;
    this.initFormGroup();
    this.INTERVIEW_FORM_CONFIG[this.operation].initMethod();
    this.INTERVIEW_FORM_CONFIG[this.operation].isElementsShow();
  }


  initFormGroup() {
    this.interviewForm = this.formBuilder.group({
      id: [this.interview.id],
      place: [this.interview.place, Validators.required],
      feedback: [this.interview.feedback || ''],
      finalMark: [this.interview.finalMark],
      status: this.formBuilder.group({
        id: this.interview.status.id || 1,
        name: this.interview.status.name || 'wait'
      }),
      candidate: this.formBuilder.group({
        id: this.interview.candidate.id || ''
      }),
      discipline: this.formBuilder.group({
        id: this.interview.disciplineSet[0].id || '',
        name: this.interview.disciplineSet[0].name || '',
        hasChildren: this.interview.disciplineSet[0].hasChildren || false,
        isExpanded: true,
        mark: this.interview.finalMark
      }),
      interviewerSet: this.formBuilder.array(this.initInterviewerFormList())
    });
  }

  initInterviewerFormList(): FormGroup[] {
    const formGroupList: FormGroup[] = [];
    this.interview.interviewerSet.forEach(interviewer =>
      formGroupList.push(this.initInterviewerForm(interviewer)));
    return formGroupList;
  }

  initInterviewerForm(interviewer?: UserBaseInfoDTO): FormGroup {
    const id: number = interviewer ? interviewer.id : null;
    return this.formBuilder.group({
      id: [id || '', Validators.required]
    });
  }

  showDiscipline() {
    this.refreshData();
    this.isDisciplineDisplay = true;
  }

  showInterviewers() {
    this.fetchInterviewerList();
  }

  interviewersClick() {
    if (!this.isInterviewView && this.interviewerList.length > 0) {
      this.switchSaveButtonDisplay();
    }
  }

  showSaveButton() {
    if (!this.isSaveButtonDisplay) {
      this.isSaveButtonDisplay = true;
    }
  }

  fetchInterviewerList() {
    this.userControllerService
      .findByDisciplineAndTimeRangeUsingGET({
        disciplineId: this.interviewForm.controls.discipline.value.id,
        rangeEnd: this.interval.endStringDate,
        rangeStart: this.interval.startStringDate
      })
      .subscribe(interviewerList => {
        if (this.isNewInterview) {
          this.interviewerList = interviewerList;
        } else {
          this.interviewerList = Array.from(this.tempInterviewList);
          let newList = interviewerList.filter(interviewer => {
            return !this.tempInterviewList.some(element => interviewer.id == element.id);
          });
          Array.prototype.push.apply(this.interviewerList, newList);
        }
        this.isInterviewersDisplay = true;
        this.switchSaveButtonDisplay();
      })
  }

  switchSaveButtonDisplay() {
    let interview: FullInterviewInfoDTO = this.createObject();
    let selectInterviewCount: number = 0;
    interview.interviewerSet.forEach(interviewer => {
      if (interviewer.id) {
        selectInterviewCount++;
      }
    });
    if (this.interviewerList.length && selectInterviewCount) {
      this.isSaveButtonDisplay = true;
    } else {
      this.isSaveButtonDisplay = false;
    }
  }

  saveInterview() {
    if (this.interviewForm.valid) {
      let interview: FullInterviewInfoDTO = this.createObject();
      interview.startTime = this.interval.startStringDate;
      interview.endTime = this.interval.endStringDate;
      interview.disciplineSet = [interview.discipline];
      this.INTERVIEW_FORM_CONFIG[this.operation].saveMethod(interview)
        .subscribe(body => {
          this.displayMessage(this.INTERVIEW_FORM_CONFIG[this.operation].successfullySaveMessage);
        }, (error: any) => {
          this.displayMessage(this.INTERVIEW_FORM_CONFIG[this.operation].notSuccessfullySaveMessage);
        });
    } else {
      this.lightFieldService.lightField(this.interviewForm.controls);
      this.lightFieldService.lightArray('interviewerSet', this.interviewForm);
    }
  }

  displayMessage(message: string) {
    this.popupService.displayMessage(message, this.router);
  }

  createObject(): FullInterviewInfoDTO {
    const interview: FullInterviewInfoDTO = new FullInterviewInfoDTO();
    const controls = this.interviewForm.controls;
    Object.keys(controls)
      .forEach(controlName => {
        interview[controlName] = controls[controlName].value;
      });
    return interview;
  }

  refreshDataClick() {
    if (!this.isInterviewView) {
      this.refreshData();
    }
  }

  refreshData() {
    if (this.isInterviewersDisplay) {
      this.fetchInterviewerList();
    }
  }

  removeRow(index: number, title: string, interviewForm: FormGroup) {
    const control = <FormArray>interviewForm.controls[title];
    control.removeAt(index);
  }

  initTimeInterval() {
    if (this.interview) {
      this.interval.startDate = new Date(this.interview.startTime);
      this.interval.endDate = new Date(this.interview.endTime);
      this.interval.startStringDate = this.convertDateToString(this.interval.startDate);
      this.interval.endStringDate = this.convertDateToString(this.interval.endDate);
    } else {
      this.interval.startDate = new Date();
      this.interval.startDate.setMinutes(0);
      this.interval.endDate = new Date();
      this.interval.endDate.setHours(this.interval.startDate.getHours() + 1);
      this.interval.endDate.setMinutes(0);
      this.interval.startStringDate = this.convertDateToString(new Date());
      this.interval.endStringDate = this.convertDateToString(new Date());
    }
  }

  convertDateToString(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

  fetchDisciplines(disciplines: InterviewDisciplineDTO[]) {
    this.interviewForm.controls.discipline.value.id = disciplines[0].id;
    this.disciplines = disciplines;
  }

}
