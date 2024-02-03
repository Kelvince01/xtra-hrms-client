/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {AttendanceOvertimeListComponent} from '@admin-ui/ams/overtimes/attendance-overtime-list/attendance-overtime-list.component';
import {AttendanceOvertimeUpsertComponent} from '@admin-ui/ams/overtimes/attendance-overtime-upsert/attendance-overtime-upsert.component';
import {Routes} from '@angular/router';

export const OVERTIME_ROUTES: Routes = [
  {
    path: '',
    component: AttendanceOvertimeListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: AttendanceOvertimeUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: AttendanceOvertimeUpsertComponent,
    data: {revalidate: 60},
  },
];
