import {Routes} from '@angular/router';

export const ATTENDANCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@admin-ui/ams/attendance/attendance-list/attendance-list.component').then(
        (c) => c.AttendanceListComponent,
      ),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () =>
      import('@admin-ui/ams/attendance/attendance-upsert/attendance-upsert.component').then(
        (c) => c.AttendanceUpsertComponent,
      ),
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('@admin-ui/ams/attendance/attendance-upsert/attendance-upsert.component').then(
        (c) => c.AttendanceUpsertComponent,
      ),
    data: {revalidate: 60},
  },
];
