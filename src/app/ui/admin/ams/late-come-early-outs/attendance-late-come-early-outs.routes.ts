/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {AttendanceLateComeEarlyOutListComponent} from '@admin-ui/ams/late-come-early-outs/attendance-late-come-early-out-list/attendance-late-come-early-out-list.component';
import {AttendanceLateComeEarlyOutUpsertComponent} from '@admin-ui/ams/late-come-early-outs/attendance-late-come-early-out-upsert/attendance-late-come-early-out-upsert.component';
import {Routes} from '@angular/router';

export const ATTENDANCE_LATE_COME_EARLY_OUT_ROUTES: Routes = [
  {
    path: '',
    component: AttendanceLateComeEarlyOutListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: AttendanceLateComeEarlyOutUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: AttendanceLateComeEarlyOutUpsertComponent,
    data: {revalidate: 60},
  },
];
