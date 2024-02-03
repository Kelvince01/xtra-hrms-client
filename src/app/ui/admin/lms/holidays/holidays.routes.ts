/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {HolidayListComponent} from '@admin-ui/lms/holidays/holiday-list/holiday-list.component';
import {HolidayUpsertComponent} from '@admin-ui/lms/holidays/holiday-upsert/holiday-upsert.component';
import {Routes} from '@angular/router';

export const HOLIDAY_ROUTES: Routes = [
  {
    path: '',
    component: HolidayListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: HolidayUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: HolidayUpsertComponent,
    data: {revalidate: 60},
  },
];
