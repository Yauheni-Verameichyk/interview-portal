import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewMarksComponent } from './interview-marks.component';

xdescribe('InterviewMarksComponent', () => {
  let component: InterviewMarksComponent;
  let fixture: ComponentFixture<InterviewMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
