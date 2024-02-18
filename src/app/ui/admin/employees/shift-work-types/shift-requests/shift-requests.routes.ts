/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { ShiftRequestListComponent } from '@admin-ui/employees/shift-work-types/shift-requests/shift-request-list/shift-request-list.component';
import { ShiftRequestUpsertComponent } from '@admin-ui/employees/shift-work-types/shift-requests/shift-request-upsert/shift-request-upsert.component';
import { Routes } from '@angular/router';

export const SHIFT_REQUEST_ROUTES: Routes = [
  {
    path: '',
    component: ShiftRequestListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: ShiftRequestUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: ShiftRequestUpsertComponent,
    data: { revalidate: 60 },
  },
];
