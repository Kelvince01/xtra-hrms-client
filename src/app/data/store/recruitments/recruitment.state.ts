import {IRecruitment} from '@models/recruitments.model';

export interface RecruitmentState {
  recruitment: IRecruitment;
  recruitments: IRecruitment[];
}
