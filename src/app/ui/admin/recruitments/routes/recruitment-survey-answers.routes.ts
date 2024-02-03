import {Routes} from '@angular/router';

import {RecruitmentSurveyAnswerListComponent} from '@admin-ui/recruitments/list/recruitment-survey-answer-list/recruitment-survey-answer-list.component';
import {RecruitmentSurveyAnswerUpsertComponent} from '@admin-ui/recruitments/upsert/recruitment-survey-answer-upsert/recruitment-survey-answer-upsert.component';

export const RECRUITMENT_SURVEY_ANSWER_ROUTES: Routes = [
  {
    path: '',
    component: RecruitmentSurveyAnswerListComponent,
  },
  {
    path: 'add',
    component: RecruitmentSurveyAnswerUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: RecruitmentSurveyAnswerUpsertComponent,
  },
];
