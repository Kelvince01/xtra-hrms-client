/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { EmployeeObjectiveListComponent } from '@admin-ui/pms/employee-objectives/employee-objective-list/employee-objective-list.component';
import { EmployeeObjectiveUpsertComponent } from '@admin-ui/pms/employee-objectives/employee-objective-upsert/employee-objective-upsert.component';
import { Routes } from '@angular/router';

export const EMPLOYEE_OBJECTIVE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeObjectiveListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: EmployeeObjectiveUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: EmployeeObjectiveUpsertComponent,
    data: { revalidate: 60 },
  },
];
