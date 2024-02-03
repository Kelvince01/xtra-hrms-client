import {Routes} from '@angular/router';
import {importProvidersFrom} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {PmsComponent} from '@admin-ui/pms/pms.component';
import {PMS_ROUTES} from '@admin-ui/pms/pms.routes';

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
    path: 'finance',
    loadComponent: () => import('./finance/finance.component').then((c) => c.FinanceComponent),
    loadChildren: () => import('./finance/finance.routes').then((r) => r.FINANCE_ROUTES),
  },
  {
    path: 'lms',
    loadComponent: () => import('./lms/lms.component').then((c) => c.LmsComponent),
    loadChildren: () => import('./lms/lms.routes').then((r) => r.LEAVE_MGT_ROUTES),
  },
  {
    path: 'comms',
    loadComponent: () => import('./comms/comms.component').then((c) => c.CommsComponent),
    providers: [importProvidersFrom(ReactiveFormsModule, TranslateModule)],
    loadChildren: () => import('./comms/comms.routes').then((c) => c.COMMUNICATION_ROUTES),
  },
  {
    path: 'ams',
    loadComponent: () => import('./ams/ams.component').then((c) => c.AmsComponent),
    loadChildren: () => import('./ams/ams.routes').then((r) => r.amsRoutes),
  },
  {
    path: 'recruitments',
    loadComponent: () =>
      import('./recruitments/recruitments.component').then((c) => c.RecruitmentsComponent),
    loadChildren: () =>
      import('./recruitments/recruitments.routes').then((r) => r.recruitmentsRoutes),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./onboarding/onboarding.component').then((c) => c.OnboardingComponent),
    loadChildren: () => import('./onboarding/onboarding.routes').then((r) => r.ONBOARDING_ROUTES),
  },
  {
    path: 'training',
    loadComponent: () =>
      import('./trainings/trainings.component').then((c) => c.TrainingsComponent),
    loadChildren: () => import('./trainings/trainings.routes').then((r) => r.TRAINING_ROUTES),
  },
  {
    path: 'pms',
    component: PmsComponent,
    children: PMS_ROUTES,
  },
  {
    path: 'pm',
    loadComponent: () => import('./pm/pm.component').then((c) => c.PmComponent),
    loadChildren: () => import('./pm/pm.routes').then((r) => r.pmRoutes),
  },
  {
    path: 'cms',
    loadComponent: () => import('./cms/cms.component').then((c) => c.CmsComponent),
    loadChildren: () => import('./cms/cms.routes').then((r) => r.cmsRoutes),
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
