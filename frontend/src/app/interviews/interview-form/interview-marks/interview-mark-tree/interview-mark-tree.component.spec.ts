import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewMarkTreeComponent } from './interview-mark-tree.component';

describe('InterviewMarkTreeComponent', () => {
  let component: InterviewMarkTreeComponent;
  let fixture: ComponentFixture<InterviewMarkTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewMarkTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewMarkTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
