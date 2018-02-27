import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  } from 'events';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent {

  @Output() displayForm = new EventEmitter(); 

  constructor() { }

  change() {
    this.displayForm.emit();
  }

}
