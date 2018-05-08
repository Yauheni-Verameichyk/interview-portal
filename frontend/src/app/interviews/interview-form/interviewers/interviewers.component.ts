import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { InterviewFormService } from '../service/interview-form.service';
import { element } from 'protractor';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrls: ['./interviewers.component.css']
})
export class InterviewersComponent {

  @Input() interviewForm: FormGroup;
  @Input() interviewerList: Array<UserBaseInfoDTO>;
  @Input() isInterviewerView: boolean;
  public listOfInterviewersList: Array<Array<UserBaseInfoDTO>> = new Array<Array<UserBaseInfoDTO>>();

  readonly messageInterviewerNotSelected: string = "Interviewer not selected!!!";

  constructor(private interviewFormService: InterviewFormService) { }

  get isPlusButtonShow() {
    let arrayLength: number = this.interviewForm.controls['interviewerSet'].value.length;
    let isPlusButton: boolean = false;
    if (!this.isInterviewerView && (this.interviewerList.length !== arrayLength) && (this.interviewerList.length > 0)) {
      isPlusButton = true;
    }
    return isPlusButton;
  }

  fetchInterviewerList(count: number): Array<UserBaseInfoDTO> {
    let interviewers = this.interviewForm.controls['interviewerSet'].value;
    if (!interviewers[count].id) {
      this.listOfInterviewersList[count] = this.fetchFreeInterviewers(interviewers);
    }  else {
      let list = this.fetchFreeInterviewers(interviewers);
      this.additionInterviewerToList(list, interviewers[count].id);
      this.listOfInterviewersList[count] = list;
    }
    this.modifyInterviewerList(interviewers, count);
    return this.listOfInterviewersList[count];
  }

  fetchFreeInterviewers(selectedInterviewers: Array<UserBaseInfoDTO>): Array<UserBaseInfoDTO> {
    return this.interviewerList.filter(interviewer => {
      return !selectedInterviewers.some(selectedInterviewer => interviewer.id == selectedInterviewer.id);
    });
  }

  additionInterviewer(): void {
    const control = <FormArray>this.interviewForm.controls['interviewerSet'];
    control.push(this.interviewFormService.initInterviewerForm());
  }

  remove(index: number, title: string) {
    this.interviewFormService.removeRow(index, title, this.interviewForm);
  }

  additionInterviewerToList(list: Array<UserBaseInfoDTO>, id: number) {
    this.interviewerList.forEach(element => {
      if (element.id == id) {
        list.push(element);
      }
    });
  }

  modifyInterviewerList(interviewers: Array<UserBaseInfoDTO>, count: number) {
    let maxValue: number = interviewers.length <= this.listOfInterviewersList.length ? interviewers.length : this.listOfInterviewersList.length;
    for (let i = 0; i < maxValue; i++) {
      if(i != count) {
        let newFormInterviewers: Array<UserBaseInfoDTO> = new Array<UserBaseInfoDTO>();
        let formInterviewers: Array<UserBaseInfoDTO> = this.listOfInterviewersList[i];
        for (let j = 0; j < formInterviewers.length; j++) {
          if (interviewers[i].id == formInterviewers[j].id) {
            newFormInterviewers.push(formInterviewers[j]);
          }          
        }
        this.listOfInterviewersList[i] = newFormInterviewers;
      }
    }
  }

}
