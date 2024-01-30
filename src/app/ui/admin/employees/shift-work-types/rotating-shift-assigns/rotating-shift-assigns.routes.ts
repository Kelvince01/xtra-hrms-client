/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { RotatingShiftAssignListComponent } from '@admin-ui/employees/shift-work-types/rotating-shift-assigns/rotating-shift-assign-list/rotating-shift-assign-list.component';
import { RotatingShiftAssignUpsertComponent } from '@admin-ui/employees/shift-work-types/rotating-shift-assigns/rotating-shift-assign-upsert/rotating-shift-assign-upsert.component';
import { Routes } from '@angular/router';

export const ROTATING_SHIFT_ASSIGN_ROUTES: Routes = [
  {
    path: '',
    component: RotatingShiftAssignListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: RotatingShiftAssignUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: RotatingShiftAssignUpsertComponent,
    data: { revalidate: 60 }
  }
];
