/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { WorkRecordListComponent } from '@admin-ui/finance/work-records/work-record-list/work-record-list.component';
import { WorkRecordUpsertComponent } from '@admin-ui/finance/work-records/work-record-upsert/work-record-upsert.component';
import { Routes } from '@angular/router';

export const WORK_RECORD_ROUTES: Routes = [
  {
    path: '',
    component: WorkRecordListComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    component: WorkRecordUpsertComponent,
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    component: WorkRecordUpsertComponent,
    data: { revalidate: 60 }
  }
];
