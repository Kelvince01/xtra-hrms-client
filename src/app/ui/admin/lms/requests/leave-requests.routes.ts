/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

export const LEAVE_REQUEST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./leave-request-list/leave-request-list.component').then(
        c => c.LeaveRequestListComponent
      ),
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./leave-request-upsert/leave-request-upsert.component').then(
        c => c.LeaveRequestUpsertComponent
      ),
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./leave-request-upsert/leave-request-upsert.component').then(
        c => c.LeaveRequestUpsertComponent
      ),
    data: { revalidate: 60 }
  }
];
