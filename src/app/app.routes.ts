import {Routes} from '@angular/router';
import {PageNotFoundComponent} from '@main-ui/page-not-found/page-not-found.component';
import {authGuard} from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/admin/admin.component').then((c) => c.AdminComponent),
    loadChildren: () => import('./ui/admin/admin.routes').then((r) => r.adminRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'accounts',
    loadComponent: () => import('./ui/auth/auth.component').then((c) => c.AuthComponent),
    loadChildren: () => import('./ui/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: 'fp',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/finance-portal/finance-portal.component').then((c) => c.FinancePortalComponent),
    loadChildren: () =>
      import('./ui/finance-portal/finance-portal.routes').then((r) => r.financePortalRoutes),
    data: {revalidate: 60},
    title: 'Finance Portal',
  },
  {
    path: 'ep',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/employee-portal/employee-portal.component').then(
        (c) => c.EmployeePortalComponent,
      ),
    loadChildren: () =>
      import('./ui/employee-portal/employee-portal.routes').then((r) => r.employeePortalRoutes),
    data: {revalidate: 60},
    title: 'Eemployee Portal',
  },
  {
    path: 'careers',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/careers-portal/careers-portal.component').then((c) => c.CareersPortalComponent),
    loadChildren: () =>
      import('./ui/careers-portal/careers-portal.routes').then((r) => r.careersPortalRoutes),
    data: {revalidate: 60},
    title: 'Careers Portal',
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {path: '**', component: PageNotFoundComponent},
];
