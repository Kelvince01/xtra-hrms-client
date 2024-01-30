/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { RotatingShiftListComponent } from '@admin-ui/employees/shift-work-types/rotating-shifts/rotating-shift-list/rotating-shift-list.component';
import { RotatingShiftUpsertComponent } from '@admin-ui/employees/shift-work-types/rotating-shifts/rotating-shift-upsert/rotating-shift-upsert.component';
import { Routes } from '@angular/router';

export const ROTATING_SHIFT_ROUTES: Routes = [
  {
    path: '',
    component: RotatingShiftListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: RotatingShiftUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: RotatingShiftUpsertComponent,
    data: { revalidate: 60 }
  }
];
