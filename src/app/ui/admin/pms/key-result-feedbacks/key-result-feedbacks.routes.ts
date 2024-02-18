/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { KeyResultFeedbackListComponent } from '@admin-ui/pms/key-result-feedbacks/key-result-feedback-list/key-result-feedback-list.component';
import { KeyResultFeedbackUpsertComponent } from '@admin-ui/pms/key-result-feedbacks/key-result-feedback-upsert/key-result-feedback-upsert.component';
import { Routes } from '@angular/router';

export const KEY_RESULT_FEEDBACK_ROUTES: Routes = [
  {
    path: '',
    component: KeyResultFeedbackListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: KeyResultFeedbackUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: KeyResultFeedbackUpsertComponent,
    data: { revalidate: 60 },
  },
];
