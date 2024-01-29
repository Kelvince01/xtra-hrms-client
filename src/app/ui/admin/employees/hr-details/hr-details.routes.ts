/*
 * Copyright (c) 2023.  Kelvince Phillips
 */

import {Routes} from '@angular/router';

export const hrDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./hr-detail-list/hr-detail-list.component').then((c) => c.HrDetailListComponent),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./hr-detail-page/hr-detail-page.component').then((c) => c.HrDetailPageComponent),
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./hr-detail-page/hr-detail-page.component').then((c) => c.HrDetailPageComponent),
    data: {revalidate: 60},
  },
];
