import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CalendarFormComponent } from './calendar-form.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { NO_ERRORS_SCHEMA, Component, Input, forwardRef } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { SpecifiedTime } from '../../api/models/specified-time';
import { CustomValidators } from 'ng4-validators';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';

describe('CalendarFormComponent', () => {
  let component: CalendarFormComponent;
  let fixture: ComponentFixture<CalendarFormComponent>;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get(string: string) { return string === 'specifiedTimeId' ? '0' : null; }
      }
    }
  };

  const specifiedTime = {
    endTime: new Date('2018-05-10T20:00:00'),
    id: 1,
    repeatInterval: 'P7D',
    startTime: new Date('2018-04-10T20:00:00'),
    user: { id: 1, name: 'Ananas' },
    duration: 1,
    isRepeatable: true,
    repeatPattern: 'weekly',
    repeatPeriod: 1
  };

  const specifiedTimeDTO = {
    endTime: '2018-05-10T20:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P7D',
    duration: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, SharedModule],
      declarations: [CalendarFormComponent, MockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CalendarService, useClass: CalendarServiceStub },
        { provide: SpecifiedTimeControllerService, useClass: SpecifiedTimeControllerServiceStub },
        { provide: ExcludedTimeSlotControllerService, useClass: ExcludedTimeSlotControllerServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: LightFieldService, useClass: LightFieldServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create new specified time', () => {
    expect(component.specifiedTime).toBeTruthy();
    expect(component.specifiedTime.duration).toEqual(1);
    expect(component.specifiedTime.repeatPeriod).toEqual(1);
  });

  it('should read specified time to edit', inject([SpecifiedTimeControllerService, ActivatedRoute],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, activatedRoute: ActivatedRoute) => {
      spyOn(specifiedTimeControllerService, 'findByIdUsingGET_3').and.returnValue(Observable.of(specifiedTimeDTO));
      spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue(1);
      fixture = TestBed.createComponent(CalendarFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.specifiedTime).toEqual(specifiedTime);
      expect(component.specifiedTimeDTO).toEqual(specifiedTimeDTO);
    }));

  it('should fail to read specified time to edit', inject([SpecifiedTimeControllerService, ActivatedRoute, PopupService],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, activatedRoute: ActivatedRoute, popupService: PopupService) => {
      spyOn(specifiedTimeControllerService, 'findByIdUsingGET_3').and.callFake((parameterName) => Observable.throw(new Error()));
      spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue(1);
      spyOn(popupService, 'displayMessage').and.callThrough();
      fixture = TestBed.createComponent(CalendarFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(popupService.displayMessage).toHaveBeenCalled();
    }));

    it('should create new specified time', () => {
      expect(component.specifiedTime).toBeTruthy();
      expect(component.specifiedTime.duration).toEqual(1);
      expect(component.specifiedTime.repeatPeriod).toEqual(1);
    });
});

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MockComponent),
  multi: true
};

@Component({
  selector: 'mwl-demo-utils-date-time-picker',
  template: '<p>Mock Product Settings Component</p>',
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
class MockComponent {
  @Input() placeholder: string;
  @Input() showTime;
  date: Date;
  writeValue(date: Date): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
}

class CalendarServiceStub {
  initFormGroup(specifiedTime: SpecifiedTime): FormGroup {
    return new FormGroup({
      'duration': new FormControl([specifiedTime.duration], [Validators.required,
      CustomValidators.digits, CustomValidators.range([1, 8])]),
      'startTime': new FormControl([specifiedTime.duration], [Validators.required, CustomValidators.date]),
      'isRepeatable': new FormControl([specifiedTime.isRepeatable]),
      'repeatPattern': new FormControl([specifiedTime.repeatPattern]),
      'repeatPeriod': new FormControl([specifiedTime.repeatPeriod]),
      'endTime': new FormControl([specifiedTime.endTime])
    });
  }

  getCurrentDate(): Date {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  convertDTOToSpecifiedTime(any) {
    return {
      endTime: new Date('2018-05-10T20:00:00'),
      id: 1,
      repeatInterval: 'P7D',
      startTime: new Date('2018-04-10T20:00:00'),
      user: { id: 1, name: 'Ananas' },
      duration: 1,
      isRepeatable: true,
      repeatPattern: 'weekly',
      repeatPeriod: 1
    };
  }

  setValidatorsForNonRepeatable(any) { }

  updateEndTimeValidator(any) { }
}

class SpecifiedTimeControllerServiceStub {
  findByIdUsingGET_3(any) {
    return Observable.of(null);
  }
}

class ExcludedTimeSlotControllerServiceStub { }

class LightFieldServiceStub { }
