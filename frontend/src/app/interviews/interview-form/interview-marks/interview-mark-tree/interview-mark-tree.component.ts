import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ITreeOptions } from 'angular-tree-component';
import { PopupService } from '../../../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineControllerService } from '../../../../api/services';
import { Router } from '@angular/router';
import { InterviewDisciplineDTO } from '../../../../api/models/interview-discipline-dto';
import { FormGroup } from '@angular/forms';
import { FullInterviewInfoDTO } from '../../../../api/models/full-interview-info-dto';

@Component({
  selector: 'app-interview-mark-tree',
  templateUrl: './interview-mark-tree.component.html',
  styleUrls: ['./interview-mark-tree.component.css']
})
export class InterviewMarkTreeComponent implements OnDestroy {


  private disciplineList: InterviewDisciplineDTO[] = [];
  @Input() interviewForm: FormGroup;
  activeDiscipline: InterviewDisciplineDTO;
  private readonly destroy: Subject<void> = new Subject();

  options: ITreeOptions = {
    getChildren: this.findSubItems.bind(this),
    actionMapping: {
      mouse: {
        click: () => {},
      },
    },
  };

  constructor(private disciplinesControllerService: DisciplineControllerService,
    private popupService: PopupService,
    private router: Router) { }

  findSubItems(node: any): Promise<InterviewDisciplineDTO[]> {
    return this.disciplinesControllerService.findSubItemsUsingGET(node.id).toPromise();
  }

  get disciplines(): FullInterviewInfoDTO[] {
    if(!this.disciplineList.length) {
      let interview: FullInterviewInfoDTO = this.createObject();
      this.disciplineList = Array.from([interview.discipline]);
    }
    return this.disciplineList;
  }

  createObject(): FullInterviewInfoDTO {
    const interview: FullInterviewInfoDTO = new FullInterviewInfoDTO();
    if (this.interviewForm) {
      const controls = this.interviewForm.controls;
      Object.keys(controls)
        .forEach(controlName => {
          interview[controlName] = controls[controlName].value;
        });
    }
    return interview;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
