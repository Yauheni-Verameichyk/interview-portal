import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class InterviewFormService {

  private operation: string = '';

  private readonly INTERVIEW_FORM_CONFIG = {
    'interview-create': {
      formTitle: 'Add interview'
    },
    'interview-view': {
      formTitle: 'View interview'
    },
    'interview-update': {
      formTitle: 'Edit interview'
    }
  }

  constructor(private route: ActivatedRoute) { }

  get formTitle(): string {
    return this.INTERVIEW_FORM_CONFIG[this.operation].formTitle;
  }

  initInterviewForm() {
    this.route.snapshot.url.forEach(element => {
      if (this.INTERVIEW_FORM_CONFIG[element.path]) {
        this.operation = element.path;
      }
    });
  }

}
