/*
 * Copyright (c) 2024.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {ONBOARDING_STAGE_ROUTES} from '@admin-ui/onboarding/routes/onboarding-stages.routes';
import {ONBOARDING_PORTAL_ROUTES} from '@admin-ui/onboarding/routes/onboarding-portals.routes';
import {ONBOARDING_TASK_ROUTES} from '@admin-ui/onboarding/routes/onboarding-tasks.routes';
import {CANDIDATE_STAGE_ROUTES} from '@admin-ui/onboarding/routes/candidate-stages.routes';
import {CANDIDATE_TASK_ROUTES} from '@admin-ui/onboarding/routes/candidate-tasks.routes';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    children: ONBOARDING_STAGE_ROUTES,
  },
  {
    path: 'portals',
    children: ONBOARDING_PORTAL_ROUTES,
  },
  {
    path: 'tasks',
    children: ONBOARDING_TASK_ROUTES,
  },
  {
    path: 'candidate-stages',
    children: CANDIDATE_STAGE_ROUTES,
  },
  {
    path: 'candidate-tasks',
    children: CANDIDATE_TASK_ROUTES,
  },
];
