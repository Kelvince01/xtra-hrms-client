import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./email-list/email-list.component'),
    data: { revalidate: 60 },
  },
  {
    path: 'add',
    loadComponent: () => import('./email-page/email-page.component'),
    data: { revalidate: 60 },
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./email-page/email-page.component'),
    data: { revalidate: 60 },
  },
] as Routes;
