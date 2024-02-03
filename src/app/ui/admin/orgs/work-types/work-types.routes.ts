/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {WorkTypeUpsertComponent} from '@admin-ui/orgs/work-types/work-type-upsert/work-type-upsert.component';
import {WorkTypeListComponent} from '@admin-ui/orgs/work-types/work-type-list/work-type-list.component';

export const WORK_TYPE_ROUTES: Routes = [
  {
    path: '',
    component: WorkTypeListComponent,
  },
  {
    path: 'add',
    component: WorkTypeUpsertComponent,
  },
  {
    path: 'edit/:id',
    component: WorkTypeUpsertComponent,
  },
];
