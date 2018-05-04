import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { InterviewFormService } from '../service/interview-form.service';
import { element } from 'protractor';

@Component({
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

  fetchInterviewerList(count: number): Array<Array<UserBaseInfoDTO>> {

    let interviewers = this.interviewForm.controls['interviewerSet'].value;
    let newInterviewerList = new Array<UserBaseInfoDTO>();
    if(!this.listOfInterviewersList[count]) {
      this.listOfInterviewersList[count] = Array.from(this.interviewerList);
    }


    for (let i = 0; i < this.listOfInterviewersList.length; i++) {
      let a = this.listOfInterviewersList[i];
      let aa: Array<UserBaseInfoDTO> = new Array<UserBaseInfoDTO>();
      for (let j = 0; j < this.listOfInterviewersList[i].length; j++) {
        if (i !== j) {
          for (let k = 0; k < interviewers.length; k++) {
            if (a[j].id !== interviewers[k].id) {
              // a.splice(j, 1);
              aa.push(a[j]);
            }
          }
        }
      }
      console.log(a);
      this.listOfInterviewersList[i] = Array.from(aa);
    }


    return this.listOfInterviewersList;
  }

  additionInterviewer(): void {
    const control = <FormArray>this.interviewForm.controls['interviewerSet'];
    control.push(this.interviewFormService.initInterviewerForm());
  }

  remove(index: number, title: string) {
    this.interviewFormService.removeRow(index, title, this.interviewForm);
  }

}
