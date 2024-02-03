/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {AvailableLeaveListComponent} from '@admin-ui/lms/availables/available-leave-list/available-leave-list.component';
import {AvailableLeaveUpsertComponent} from '@admin-ui/lms/availables/available-leave-upsert/available-leave-upsert.component';
import {Routes} from '@angular/router';

export const AVAILABLE_LEAVE_ROUTES: Routes = [
  {
    path: '',
    component: AvailableLeaveListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: AvailableLeaveUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: AvailableLeaveUpsertComponent,
    data: {revalidate: 60},
  },
];
