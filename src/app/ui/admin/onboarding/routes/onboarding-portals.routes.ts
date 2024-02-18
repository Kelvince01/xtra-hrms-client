/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

import { OnboardingPortalListComponent } from '@admin-ui/onboarding/list/onboarding-portal-list/onboarding-portal-list.component';
import { OnboardingPortalUpsertComponent } from '@admin-ui/onboarding/upsert/onboarding-portal-upsert/onboarding-portal-upsert.component';

export const ONBOARDING_PORTAL_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingPortalListComponent,
  },
  {
    path: 'add',
    component: OnboardingPortalUpsertComponent,
  },
  {
    path: 'edit:/id',
    component: OnboardingPortalUpsertComponent,
  },
];
