import { Injectable } from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class CandidateService {

  readonly messageSuccessfully: string = "Candidate was successfully created !!!";
  readonly messageNotSuccessfully: string = "Could not create candidate! Try later!";
  readonly dateRegExp: RegExp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
  readonly phoneNumberRegExp: RegExp = /^(\d){7,}$/;
  readonly titleValidations: ValidatorFn[] = [Validators.required, Validators.minLength(4), Validators.maxLength(200)];
  readonly dateValidations: ValidatorFn[] = [Validators.required, Validators.pattern(this.dateRegExp)];

  constructor() { }

  createObject(formGroup: FormGroup): Candidate {
    const candidate: Candidate = new Candidate();
    const controls = formGroup.controls;
    Object.keys(controls)
      .forEach(controlName => {
        candidate[controlName] = controls[controlName].value;
      });
    return candidate;
  }

  displayIncorrectField(formGroup: FormGroup): void {
    this.checkField(formGroup.controls);
    this.checkArray('educationCandidateList', formGroup);
    this.checkArray('workCandidateList', formGroup);
    this.checkArray('disciplineList', formGroup);

  }

  private checkArray(field: string, formGroup: FormGroup) {
    (<FormArray>formGroup.get(field)).controls.forEach((element: FormArray) => {
      this.checkField(element.controls);
    });
  }

  private checkField(controls: any) {
    Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
  }

}
