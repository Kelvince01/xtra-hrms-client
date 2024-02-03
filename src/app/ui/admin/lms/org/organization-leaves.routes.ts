/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {OrganizationLeaveListComponent} from '@admin-ui/lms/org/organization-leave-list/organization-leave-list.component';
import {OrganizationLeaveUpsertComponent} from '@admin-ui/lms/org/organization-leave-upsert/organization-leave-upsert.component';
import {Routes} from '@angular/router';

export const ORGANIZATION_LEAVE_ROUTES: Routes = [
  {
    path: '',
    component: OrganizationLeaveListComponent,
    data: {revalidate: 60},
  },
  {
    path: 'add',
    component: OrganizationLeaveUpsertComponent,
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    component: OrganizationLeaveUpsertComponent,
    data: {revalidate: 60},
  },
];
