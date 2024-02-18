/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { FeedbackListComponent } from '@admin-ui/pms/feedbacks/feedback-list/feedback-list.component';
import { FeedbackUpsertComponent } from '@admin-ui/pms/feedbacks/feedback-upsert/feedback-upsert.component';
import { Routes } from '@angular/router';

export const FEEDBACK_ROUTES: Routes = [
  {
    path: '',
    component: FeedbackListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: FeedbackUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: FeedbackUpsertComponent,
    data: { revalidate: 60 },
  },
];
