/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { WorkTypeRequestListComponent } from '@admin-ui/employees/shift-work-types/work-type-requests/work-type-request-list/work-type-request-list.component';
import { WorkTypeRequestUpsertComponent } from '@admin-ui/employees/shift-work-types/work-type-requests/work-type-request-upsert/work-type-request-upsert.component';
import { Routes } from '@angular/router';

export const WORK_TYPE_REQUEST_ROUTES: Routes = [
  {
    path: '',
    component: WorkTypeRequestListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: WorkTypeRequestUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: WorkTypeRequestUpsertComponent,
    data: { revalidate: 60 },
  },
];
