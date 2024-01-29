import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const financePortalRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      revalidate: 60,
      metatags: {
        description: 'Dashboard - Xtra HRMS (Employee Portal)',
        keywords: 'Xtra HRMS, Employee Portal, Dashboard',
      },
    },
    title: 'Dashboard',
  },
];
