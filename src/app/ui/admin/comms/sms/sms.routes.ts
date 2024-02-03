import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./sms-list/sms-list.component'),
    data: { revalidate: 60 }
  },
  {
    path: 'add',
    loadComponent: () => import('./sms-page/sms-page.component'),
    data: { revalidate: 60 }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./sms-page/sms-page.component'),
    data: { revalidate: 60 }
  }
] as Routes;
