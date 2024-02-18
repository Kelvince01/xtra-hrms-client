/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { AnswerListComponent } from '@admin-ui/pms/answers/answer-list/answer-list.component';
import { AnswerUpsertComponent } from '@admin-ui/pms/answers/answer-upsert/answer-upsert.component';
import { Routes } from '@angular/router';

export const ANSWER_ROUTES: Routes = [
  {
    path: '',
    component: AnswerListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: AnswerUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: AnswerUpsertComponent,
    data: { revalidate: 60 },
  },
];
