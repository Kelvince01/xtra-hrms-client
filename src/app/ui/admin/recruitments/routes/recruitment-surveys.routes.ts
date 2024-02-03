import {Routes} from '@angular/router';

import {RecruitmentSurveyListComponent} from '@admin-ui/recruitments/list/recruitment-survey-list/recruitment-survey-list.component';
import {RecruitmentSurveyUpsertComponent} from '@admin-ui/recruitments/upsert/recruitment-survey-upsert/recruitment-survey-upsert.component';

export const RECRUITMENT_SURVEY_ROUTES: Routes = [
  {
    path: '',
    component: RecruitmentSurveyListComponent,
  },
  {
    path: 'add',
    component: RecruitmentSurveyUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: RecruitmentSurveyUpsertComponent,
  },
];
