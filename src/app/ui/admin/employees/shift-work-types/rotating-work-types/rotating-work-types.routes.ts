/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { RotatingWorkTypeListComponent } from '@admin-ui/employees/shift-work-types/rotating-work-types/rotating-work-type-list/rotating-work-type-list.component';
import { RotatingWorkTypeUpsertComponent } from '@admin-ui/employees/shift-work-types/rotating-work-types/rotating-work-type-upsert/rotating-work-type-upsert.component';
import { Routes } from '@angular/router';

export const ROTATING_WORK_TYPE_ROUTES: Routes = [
  {
    path: '',
    component: RotatingWorkTypeListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: RotatingWorkTypeUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: RotatingWorkTypeUpsertComponent,
    data: { revalidate: 60 },
  },
];
