/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {AttendanceValidationConditionListComponent} from '@admin-ui/ams/validation-conditions/attendance-validation-condition-list/attendance-validation-condition-list.component';
import {AttendanceValidationConditionUpsertComponent} from '@admin-ui/ams/validation-conditions/attendance-validation-condition-upsert/attendance-validation-condition-upsert.component';
import {Routes} from '@angular/router';

export const ATTENDANCE_VALIDATION_CONDITION_ROUTES: Routes = [
  {
    path: '',
    component: AttendanceValidationConditionListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: AttendanceValidationConditionUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: AttendanceValidationConditionUpsertComponent,
    data: {revalidate: 60},
  },
];
