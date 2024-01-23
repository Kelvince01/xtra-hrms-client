import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./ui/main/page-not-found/page-not-found.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/admin/admin.component').then(c => c.AdminComponent),
    loadChildren: () => import('./ui/admin/admin.routes').then(r => r.adminRoutes),
    // canActivate: [authGuard],
  },
  {
    path: 'accounts',
    loadComponent: () => import('./ui/auth/auth.component').then(c => c.AuthComponent),
    loadChildren: () => import('./ui/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent }
];
