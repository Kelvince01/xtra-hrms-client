/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import { Routes } from '@angular/router';

export const LEAVE_TYPE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./leave-type-list/leave-type-list.component').then(c => c.LeaveTypeListComponent),
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./leave-type-upsert/leave-type-upsert.component').then(
        c => c.LeaveTypeUpsertComponent
      ),
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./leave-type-upsert/leave-type-upsert.component').then(
        c => c.LeaveTypeUpsertComponent
      ),
    data: { revalidate: 60 }
  }
];
