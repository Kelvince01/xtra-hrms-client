/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { EmployeeKeyResultListComponent } from '@admin-ui/pms/employee-key-results/employee-key-result-list/employee-key-result-list.component';
import { EmployeeKeyResultUpsertComponent } from '@admin-ui/pms/employee-key-results/employee-key-result-upsert/employee-key-result-upsert.component';
import { Routes } from '@angular/router';

export const EMPLOYEE_KEY_RESULT_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeKeyResultListComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    component: EmployeeKeyResultUpsertComponent,
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    component: EmployeeKeyResultUpsertComponent,
    data: { revalidate: 60 },
  },
];
