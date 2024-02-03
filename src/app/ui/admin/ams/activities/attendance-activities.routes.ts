/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {AttendanceActivityListComponent} from '@admin-ui/ams/activities/attendance-activity-list/attendance-activity-list.component';
import {AttendanceActivityUpsertComponent} from '@admin-ui/ams/activities/attendance-activity-upsert/attendance-activity-upsert.component';
import {Routes} from '@angular/router';

export const ATTENDANCE_ACTIVITY_ROUTES: Routes = [
  {
    path: '',
    component: AttendanceActivityListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: AttendanceActivityUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: AttendanceActivityUpsertComponent,
    data: {revalidate: 60},
  },
];
