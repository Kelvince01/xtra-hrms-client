import { Routes } from '@angular/router';

export const LEAVE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./leave-list/leave-list.component').then(c => c.LeaveListComponent),
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./leave-upsert/leave-upsert.component').then(c => c.LeaveUpsertComponent),
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./leave-upsert/leave-upsert.component').then(c => c.LeaveUpsertComponent),
    data: { revalidate: 60 }
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./leave-detail/leave-detail.component').then(c => c.LeaveDetailComponent),
    data: { revalidate: 60 }
  }
];
