import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidatesRoutingModule, candidatesRouterComponent } from './candidates.routing.module';
import { CandidateComponent } from './candidate-list/candidate/candidate.component';
import { CandidateService } from './service/candidate.service';
import { CandidateControllerService } from '../api/services/candidate-controller.service';
import { CandidateFormComponent } from './candidate-list/candidate-form/candidate-form.component';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule
  ],
  declarations: [
    candidatesRouterComponent,
    CandidateListComponent,
    CandidateComponent,
    CandidateFormComponent
  ],
  providers: [
    CandidateControllerService,
    CandidateService
  ]
})
export class CandidatesModule { }
