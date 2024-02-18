/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { QuestionOptionListComponent } from '@admin-ui/pms/question-options/question-option-list/question-option-list.component';
import { QuestionOptionUpsertComponent } from '@admin-ui/pms/question-options/question-option-upsert/question-option-upsert.component';
import { Routes } from '@angular/router';

export const QUESTION_OPTION_ROUTES: Routes = [
  {
    path: '',
    component: QuestionOptionListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: QuestionOptionUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: QuestionOptionUpsertComponent,
    data: { revalidate: 60 },
  },
];
