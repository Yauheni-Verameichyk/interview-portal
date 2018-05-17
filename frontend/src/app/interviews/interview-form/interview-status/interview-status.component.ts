import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.css']
})
export class InterviewStatusComponent {

  @Input() interviewForm: FormGroup;

}
