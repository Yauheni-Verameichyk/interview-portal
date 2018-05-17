import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterviewDisciplineDTO } from '../../../api/models/interview-discipline-dto';

@Component({
  selector: 'app-interview-marks',
  templateUrl: './interview-marks.component.html',
  styleUrls: ['./interview-marks.component.css']
})
export class InterviewMarksComponent {

  @Input() interviewForm: FormGroup;
  @Input() isNewInterview: boolean;

}
