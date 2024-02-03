/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

import { OnboardingStageListComponent } from '@admin-ui/onboarding/list/onboarding-stage-list/onboarding-stage-list.component';
import { OnboardingStageUpsertComponent } from '@admin-ui/onboarding/upsert/onboarding-stage-upsert/onboarding-stage-upsert.component';

export const ONBOARDING_STAGE_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingStageListComponent
  },
  {
    path: 'add',
    component: OnboardingStageUpsertComponent
  },
  {
    path: 'edit:/id',
    component: OnboardingStageUpsertComponent
  }
];
