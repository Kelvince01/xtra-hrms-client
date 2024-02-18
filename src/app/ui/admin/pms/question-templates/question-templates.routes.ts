/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { QuestionTemplateListComponent } from '@admin-ui/pms/question-templates/question-template-list/question-template-list.component';
import { QuestionTemplateUpsertComponent } from '@admin-ui/pms/question-templates/question-template-upsert/question-template-upsert.component';
import { Routes } from '@angular/router';

export const QUESTION_TEMPLATE_ROUTES: Routes = [
  {
    path: '',
    component: QuestionTemplateListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: QuestionTemplateUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: QuestionTemplateUpsertComponent,
    data: { revalidate: 60 },
  },
];
