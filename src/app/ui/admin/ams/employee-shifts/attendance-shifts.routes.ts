/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {EmployeeShiftListComponent} from '@admin-ui/ams/employee-shifts/employee-shift-list/employee-shift-list.component';
import {EmployeeShiftUpsertComponent} from '@admin-ui/ams/employee-shifts/employee-shift-upsert/employee-shift-upsert.component';
import {Routes} from '@angular/router';

export const EMPLOYEE_SHIFT_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeShiftListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: EmployeeShiftUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: EmployeeShiftUpsertComponent,
    data: {revalidate: 60},
  },
];
