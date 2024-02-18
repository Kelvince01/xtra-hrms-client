/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { FilingStatusListComponent } from '@admin-ui/finance/filing-statuses/filing-status-list/filing-status-list.component';
import { FilingStatusUpsertComponent } from '@admin-ui/finance/filing-statuses/filing-status-upsert/filing-status-upsert.component';
import { Routes } from '@angular/router';

export const FILING_STATUS_ROUTES: Routes = [
  {
    path: '',
    component: FilingStatusListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: FilingStatusUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: FilingStatusUpsertComponent,
    data: { revalidate: 60 },
  },
];
