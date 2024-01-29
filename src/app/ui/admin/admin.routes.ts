import {Routes} from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees.component').then((c) => c.EmployeesComponent),
    loadChildren: () => import('./employees/employees.routes').then((r) => r.employeesRoutes),
  },
  {
    path: 'uam',
    loadComponent: () => import('./uam/uam.component').then((c) => c.UamComponent),
    loadChildren: () => import('./uam/uam.routes').then((r) => r.uamRoutes),
  },
  {
    path: 'org',
    loadComponent: () => import('@admin-ui/orgs/orgs.component').then((c) => c.OrgsComponent),
    loadChildren: () => import('@admin-ui/orgs/orgs.routes').then((c) => c.orgsRoutes),
  },
  {
    path: 'recruitments',
    loadComponent: () =>
      import('./recruitments/recruitments.component').then((c) => c.RecruitmentsComponent),
    loadChildren: () =>
      import('./recruitments/recruitments.routes').then((r) => r.recruitmentsRoutes),
  },
  {
    path: 'pm',
    loadComponent: () => import('./pm/pm.component').then((c) => c.PmComponent),
    loadChildren: () => import('./pm/pm.routes').then((r) => r.pmRoutes),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../auth/profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent),
  },
];
