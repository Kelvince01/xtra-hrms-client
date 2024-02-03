import {Routes} from '@angular/router';
import {ORGANIZATION_LEAVE_ROUTES} from '@admin-ui/lms/org/organization-leaves.routes';
import {HOLIDAY_ROUTES} from '@admin-ui/lms/holidays/holidays.routes';
import {AVAILABLE_LEAVE_ROUTES} from '@admin-ui/lms/availables/available-leaves.routes';

export const LEAVE_MGT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./leaves/leaves.component').then((c) => c.LeavesComponent),
    loadChildren: () => import('./leaves/leaves.routes').then((r) => r.LEAVE_ROUTES),
  },
  {
    path: 'types',
    loadChildren: () => import('./types/leave-types.routes').then((r) => r.LEAVE_TYPE_ROUTES),
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./requests/leave-requests.routes').then((r) => r.LEAVE_REQUEST_ROUTES),
  },
  {
    path: 'org',
    children: ORGANIZATION_LEAVE_ROUTES,
  },
  {
    path: 'available',
    children: AVAILABLE_LEAVE_ROUTES,
  },
  {
    path: 'holidays',
    children: HOLIDAY_ROUTES,
  },
];
