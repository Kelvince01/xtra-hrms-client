import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const EMPLOYEE_ROUTE_PREFIX = 'employee';

export const employeePortalRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: EMPLOYEE_ROUTE_PREFIX,
    loadChildren: () => import('./employee/employee.routes').then((r) => r.employeeRoutes),
  },
  {
    path: 'lms',
    loadChildren: () => import('./lms/lms.routes').then((r) => r.lmsRoutes),
  },
];
