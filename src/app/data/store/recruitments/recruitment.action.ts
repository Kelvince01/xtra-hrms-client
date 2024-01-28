import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IRecruitment} from '@models/recruitments.model';
import {RecruitmentListConfig} from '@stores/recruitments';

export const recruitmentListActions = createActionGroup({
  source: 'Recruitment List',
  events: {
    setListPage: props<{page: number}>(),
    setListConfig: props<{config: RecruitmentListConfig}>(),
    loadRecruitments: emptyProps(),
    loadRecruitmentsFailure: props<{error: Error}>(),
    loadRecruitmentsSuccess: props<{recruitments: IRecruitment[]; recruitmentsCount: number}>(),
  },
});
