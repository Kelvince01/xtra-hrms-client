/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { PeriodListComponent } from '@admin-ui/pms/periods/period-list/period-list.component';
import { PeriodUpsertComponent } from '@admin-ui/pms/periods/period-upsert/period-upsert.component';
import { Routes } from '@angular/router';

export const PERIOD_ROUTES: Routes = [
  {
    path: '',
    component: PeriodListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: PeriodUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: PeriodUpsertComponent,
    data: { revalidate: 60 }
  }
];
