/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { RotatingWorkTypeAssignListComponent } from '@admin-ui/employees/shift-work-types/rotating-work-type-assigns/rotating-work-type-assign-list/rotating-work-type-assign-list.component';
import { RotatingWorkTypeAssignUpsertComponent } from '@admin-ui/employees/shift-work-types/rotating-work-type-assigns/rotating-work-type-assign-upsert/rotating-work-type-assign-upsert.component';
import { Routes } from '@angular/router';

export const ROTATING_WORK_TYPE_ASSIGN_ROUTES: Routes = [
  {
    path: '',
    component: RotatingWorkTypeAssignListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: RotatingWorkTypeAssignUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: RotatingWorkTypeAssignUpsertComponent,
    data: { revalidate: 60 },
  },
];
