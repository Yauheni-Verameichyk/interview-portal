import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'validator-message',
  template: `
    <div class="error-message" *ngIf="field.invalid && field.touched && validatorMessages?.length">
      <span *ngFor="let errMsg of validatorMessages"> &bull;&nbsp;{{errMsg}}</span>
    </div>
  `
})
export class ValidatorMessageComponent {
  @Input() field: FormControl;
  @Input() messageRequired?: string;

  public get validatorMessages() {
    const field = this.field;
    if (!field || !field.errors) {
      return false;
    }
    const errors = [];
    const config = {
      required: 'Field is required',
      requiredTrue: 'Value should be positive',
      email: 'Field should contain e-mail',
      pattern: 'Field does not match to pattern'
    };

    if (this.messageRequired !== undefined) {
      config.required = this.messageRequired;
    }

    if (field.errors.hasOwnProperty('custom')) {
      config['custom'] = (typeof field.errors.custom === 'string' && field.errors.custom.length) ?
        field.errors.custom :
        'Does not match to format';
    }

    if (field.errors.hasOwnProperty('minlength')) {
      config['minlength'] = `Minimum length ${field.errors.minlength.requiredLength}`;
    }
    if (field.errors.hasOwnProperty('maxlength')) {
      config['maxlength'] = `Maximum length ${field.errors.maxlength.requiredLength}`;
    }
    console.log(field.errors);
    if (field.errors.hasOwnProperty('digits')) {
      config['digits'] = 'Value should be a number';
    }
    if (field.errors.hasOwnProperty('range') && !field.errors.hasOwnProperty('digits')) {
      config['range'] = `Value should be in range between ${field.errors.requiredValue[0]} and ${field.errors.requiredValue[1]}`;
    }

    Object.keys(field.errors).forEach((error: string) => {
      if (config[error]) {
        errors.push(config[error]);
      }
    });

    return errors;
  }

}

