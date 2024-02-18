/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

import { CandidateStageListComponent } from '@admin-ui/onboarding/list/candidate-stage-list/candidate-stage-list.component';
import { CandidateStageUpsertComponent } from '@admin-ui/onboarding/upsert/candidate-stage-upsert/candidate-stage-upsert.component';

export const CANDIDATE_STAGE_ROUTES: Routes = [
  {
    path: '',
    component: CandidateStageListComponent,
  },
  {
    path: 'add',
    component: CandidateStageUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: CandidateStageUpsertComponent,
  },
];
