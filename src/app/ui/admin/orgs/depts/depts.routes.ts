import {Routes} from '@angular/router';

export const DEPARTMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dept-list/dept-list.component').then((c) => c.DeptListComponent),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () => import('./dept-page/dept-page.component').then((c) => c.DeptPageComponent),
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./dept-page/dept-page.component').then((c) => c.DeptPageComponent),
    data: {revalidate: 60},
  },
];
