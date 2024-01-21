import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/admin/admin.component').then(c => c.AdminComponent),
    loadChildren: () => import('./ui/admin/admin.routes').then(r => r.adminRoutes)
  }
];
