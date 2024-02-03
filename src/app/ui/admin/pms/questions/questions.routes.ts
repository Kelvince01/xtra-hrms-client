/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { QuestionListComponent } from '@admin-ui/pms/questions/question-list/question-list.component';
import { QuestionUpsertComponent } from '@admin-ui/pms/questions/question-upsert/question-upsert.component';
import { Routes } from '@angular/router';

export const QUESTION_ROUTES: Routes = [
  {
    path: '',
    component: QuestionListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: QuestionUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: QuestionUpsertComponent,
    data: { revalidate: 60 }
  }
];
