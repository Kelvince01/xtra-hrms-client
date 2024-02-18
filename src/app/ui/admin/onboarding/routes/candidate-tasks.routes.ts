/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

import { CandidateTaskListComponent } from '@admin-ui/onboarding/list/candidate-task-list/candidate-task-list.component';
import { CandidateTaskUpsertComponent } from '@admin-ui/onboarding/upsert/candidate-task-upsert/candidate-task-upsert.component';

export const CANDIDATE_TASK_ROUTES: Routes = [
  {
    path: '',
    component: CandidateTaskListComponent,
  },
  {
    path: 'add',
    component: CandidateTaskUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: CandidateTaskUpsertComponent,
  },
];
