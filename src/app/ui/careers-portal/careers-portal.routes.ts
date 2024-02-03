import {Routes} from '@angular/router';

export const careersPortalRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
    data: {
      seo: {
        title: 'Dashboard - Xtra HRMS (Careers Portal)',
        description: 'Xtra HRMS Careers Portal',
      },
    },
  },
];
