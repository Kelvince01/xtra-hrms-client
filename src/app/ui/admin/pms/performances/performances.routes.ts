/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { PerformanceListComponent } from '@admin-ui/pms/performances/performance-list/performance-list.component';
import { PerformanceUpsertComponent } from '@admin-ui/pms/performances/performance-upsert/performance-upsert.component';
import { Routes } from '@angular/router';

export const PERFORMANCE_ROUTES: Routes = [
  {
    path: '',
    component: PerformanceListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: PerformanceUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: PerformanceUpsertComponent,
    data: { revalidate: 60 }
  }
];
