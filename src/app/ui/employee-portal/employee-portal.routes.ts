import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const employeePortalRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'lms',
    loadChildren: () => import('./lms/lms.routes').then((r) => r.lmsRoutes),
  },
];
