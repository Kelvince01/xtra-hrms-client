/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {EmployeeShiftScheduleListComponent} from '@admin-ui/ams/employee-shift-schedules/employee-shift-schedule-list/employee-shift-schedule-list.component';
import {EmployeeShiftScheduleUpsertComponent} from '@admin-ui/ams/employee-shift-schedules/employee-shift-schedule-upsert/employee-shift-schedule-upsert.component';
import {Routes} from '@angular/router';

export const EMPLOYEE_SHIFT_SCHEDULE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeShiftScheduleListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: EmployeeShiftScheduleUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: EmployeeShiftScheduleUpsertComponent,
    data: {revalidate: 60},
  },
];
