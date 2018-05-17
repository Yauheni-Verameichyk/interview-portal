/* tslint:disable */
import { DisciplineBaseInfoDTO } from './discipline-base-info-dto';
import { UserBaseInfoDTO } from './user-base-info-dto';
import { DisciplineMark } from './discipline-mark';
import { CandidateDTO } from './candidate-dto';
import { InterviewStatus } from './interview-status';
import { InterviewDisciplineDTO } from './interview-discipline-dto';

export class FullInterviewInfoDTO {

  id?: number;

  candidate?: CandidateDTO;

  disciplineSet?: InterviewDisciplineDTO[];

  discipline?: InterviewDisciplineDTO;

  endTime?: string;

  feedback?: string;

  finalMark?: string;

  description?: string;

  interviewerSet?: UserBaseInfoDTO[];

  markList?: DisciplineMark[];

  place?: string;

  startTime?: string;

  status?: InterviewStatus;
  
}
