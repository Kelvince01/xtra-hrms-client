/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

import { OnboardingTaskListComponent } from '@admin-ui/onboarding/list/onboarding-task-list/onboarding-task-list.component';
import { OnboardingTaskUpsertComponent } from '@admin-ui/onboarding/upsert/onboarding-task-upsert/onboarding-task-upsert.component';

export const ONBOARDING_TASK_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingTaskListComponent
  },
  {
    path: 'add',
    component: OnboardingTaskUpsertComponent
  },
  {
    path: 'edit:/id',
    component: OnboardingTaskUpsertComponent
  }
];
