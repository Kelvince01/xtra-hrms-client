import {Routes} from '@angular/router';
import {OrgDetailComponent} from '@admin-ui/orgs/org/org-detail/org-detail.component';
import {OrgPageComponent} from '@admin-ui/orgs/org/org-page/org-page.component';
import {OrgChartComponent} from '@admin-ui/orgs/org/org-chart/org-chart.component';
import {PositionsComponent} from '@admin-ui/orgs/positions/positions.component';
import {JOB_ROLE_ROUTES} from '@admin-ui/orgs/job-roles/job-roles.routes';
import {WORK_TYPE_ROUTES} from '@admin-ui/orgs/work-types/work-types.routes';

export const orgsRoutes: Routes = [
  {
    path: '',
    component: OrgDetailComponent,
  },
  {
    path: 'add',
    component: OrgPageComponent,
  },
  {
    path: 'chart',
    component: OrgChartComponent,
  },
  {
    path: 'branches',
    loadChildren: () =>
      import('@admin-ui/orgs/branches/branches.routes').then((r) => r.BRANCHES_ROUTES),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('@admin-ui/orgs/depts/depts.routes').then((r) => r.DEPARTMENTS_ROUTES),
  },
  {
    path: 'positions',
    component: PositionsComponent,
    loadChildren: () => import('./positions/positions.routes').then((r) => r.POSITION_ROUTES),
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.routes').then((r) => r.assetsRoutes),
  },
  {
    path: 'events',
    loadComponent: () => import('./events/events.component').then((c) => c.EventsComponent),
    data: {revalidate: 60},
  },
  {
    path: 'job-roles',
    children: JOB_ROLE_ROUTES,
  },
  {
    path: 'work-types',
    children: WORK_TYPE_ROUTES,
  },
];
