import {Routes} from '@angular/router';
import {ROTATING_SHIFT_ASSIGN_ROUTES} from '@admin-ui/employees/shift-work-types/rotating-shift-assigns/rotating-shift-assigns.routes';
import {ROTATING_SHIFT_ROUTES} from '@admin-ui/employees/shift-work-types/rotating-shifts/rotating-shifts.routes';
import {ROTATING_WORK_TYPE_ASSIGN_ROUTES} from '@admin-ui/employees/shift-work-types/rotating-work-type-assigns/rotating-work-type-assigns.routes';
import {ROTATING_WORK_TYPE_ROUTES} from '@admin-ui/employees/shift-work-types/rotating-work-types/rotating-work-types.routes';
import {SHIFT_REQUEST_ROUTES} from '@admin-ui/employees/shift-work-types/shift-requests/shift-requests.routes';
import {WORK_TYPE_REQUEST_ROUTES} from '@admin-ui/employees/shift-work-types/work-type-requests/work-type-requests.routes';

export const employeesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employee-list/employee-list.component').then((c) => c.EmployeeListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./employee-page/employee-page.component').then((c) => c.EmployeePageComponent),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./employee-page/employee-page.routes').then((c) => c.employeePageRoutes),
  },
  // {
  //   path: 'edit/:id',
  //   loadComponent: () => import('./employee-page/employee-page.component').then(c => c.EmployeePageComponent)
  // }
  {
    path: 'hr',
    loadChildren: () => import('./hr-details/hr-details.routes').then((r) => r.hrDetailsRoutes),
  },
  {
    path: 'rotating-shift-assigns',
    children: ROTATING_SHIFT_ASSIGN_ROUTES,
  },
  {
    path: 'rotating-shifts',
    children: ROTATING_SHIFT_ROUTES,
  },
  {
    path: 'rotating-work-type-assigns',
    children: ROTATING_WORK_TYPE_ASSIGN_ROUTES,
  },
  {
    path: 'rotating-work-types',
    children: ROTATING_WORK_TYPE_ROUTES,
  },
  {
    path: 'shift-requests',
    children: SHIFT_REQUEST_ROUTES,
  },
  {
    path: 'work-type-requests',
    children: WORK_TYPE_REQUEST_ROUTES,
  },
];
