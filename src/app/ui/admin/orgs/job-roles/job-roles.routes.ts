/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';
import {JobRoleUpsertComponent} from '@admin-ui/orgs/job-roles/job-role-upsert/job-role-upsert.component';
import {JobRoleListComponent} from '@admin-ui/orgs/job-roles/job-role-list/job-role-list.component';

export const JOB_ROLE_ROUTES: Routes = [
  {
    path: '',
    component: JobRoleListComponent,
  },
  {
    path: 'add',
    component: JobRoleUpsertComponent,
  },
  {
    path: 'edit/:id',
    component: JobRoleUpsertComponent,
  },
];
