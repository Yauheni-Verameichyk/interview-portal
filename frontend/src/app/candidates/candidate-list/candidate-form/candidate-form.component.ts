import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Candidate } from '../../../api/models/candidate';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { CandidateService } from '../../service/candidate.service';
import { Discipline } from '../../../api/models';
import { Subject } from 'rxjs/Subject';
import { DisciplineControllerService } from '../../../api/services';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit, OnDestroy {

  @Output() displayForm = new EventEmitter();
  candidate: Candidate = new Candidate();
  public candidateForm: FormGroup;
  public disciplines: Discipline[];
  public displayErrorMessage: boolean = false;
  public displayMessage: boolean = false;
  public viewMessage: string;
  private readonly destroy: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
    private candidateControllerService: CandidateControllerService,
    private candidateService: CandidateService,
    private disciplinesService: DisciplineControllerService) { }

  get name() { return this.candidateForm.get('name') }

  get surname() { return this.candidateForm.get('surname') }

  get phone() { return this.candidateForm.get('phoneNumber') }

  ngOnInit(): void {
    this.initCandidateForm();
    this.fetchDisciplines();
  }

  fetchDisciplines(): any {
    this.disciplinesService.findAllUsingGET()
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplines = disciplines;
      }, (error) => {
        console.log('Send to error page when it appears');
      });
  }

  initCandidateForm(): void {
    this.candidateForm = this.formBuilder.group({
      name: ['', this.candidateService.titleValidations],
      surname: ['', this.candidateService.titleValidations],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(this.candidateService.phoneNumberRegExp),
        Validators.minLength(3)
      ]],
      workCandidateList: this.formBuilder.array([this.initWorkForm()]),
      educationCandidateList: this.formBuilder.array([this.initEducationForm()]),
      disciplineList: this.formBuilder.array([this.initDisciplineForm()])
    });
  }

  initWorkForm() {
    return this.formBuilder.group({
      nameCompany: ['', this.candidateService.titleValidations],
      position: ['', this.candidateService.titleValidations],
      dateStart: ['', this.candidateService.dateValidations],
      dateEnd: ['', this.candidateService.dateValidations]
    });
  }

  initEducationForm() {
    return this.formBuilder.group({
      nameInstitution: ['', this.candidateService.titleValidations],
      profession: ['', this.candidateService.titleValidations],
      dateStart: ['', this.candidateService.dateValidations],
      dateEnd: ['', this.candidateService.dateValidations]
    });
  }

  initDisciplineForm(): any {
    return this.formBuilder.group({
      id: ['', Validators.required]
    });
  }

  createCandidate() {
    if (this.candidateForm.valid) {
      this.candidate = this.candidateService.createObject(this.candidateForm);
      this.candidateControllerService.addUsingPOST(this.candidate)
        .takeUntil(this.destroy)
        .subscribe(body => {
          this.viewMessage = this.candidateService.messageSuccessfully;
          this.displayMessage = true;
        },(error: any)=> {
          this.viewMessage = this.candidateService.messageNotSuccessfully;
          this.displayMessage = true;
        });
    } else {
      this.displayErrorMessage = true;
      this.candidateService.displayIncorrectField(this.candidateForm);
    }
  }

  remove(index: number, title: string) {
    const control = <FormArray>this.candidateForm.controls[title];
    control.removeAt(index);

  }

  additionWork(): void {
    const control = <FormArray>this.candidateForm.controls['workCandidateList'];
    control.push(this.initWorkForm());
  }

  additionEducation(): void {
    const control = <FormArray>this.candidateForm.controls['educationCandidateList'];
    control.push(this.initEducationForm());
  }

  additionDiscipline(): void {
    const control = <FormArray>this.candidateForm.controls['disciplineList'];
    control.push(this.initDisciplineForm());
  }

  change(): void {
    this.displayForm.emit();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
