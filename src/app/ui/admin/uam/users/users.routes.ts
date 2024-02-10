import {Routes} from '@angular/router';
// import {hasPermissionGuard} from '@core/guards';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list/user-list-v2.component').then((c) => c.UserListComponent),
    // canActivate: [hasPermissionGuard("ViewUsers")],
  },
  {
    path: 'add',
    loadComponent: () => import('./user-page/user-page.component').then((c) => c.UserPageComponent),
    loadChildren: () => import('./user-page/user-page-routes').then((r) => r.userPageRoutes),
    // canActivate: [hasPermissionGuard("CreateUser")],
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./user-page/user-page.component').then((c) => c.UserPageComponent),
  },
  // { path: 'add', redirectTo: 'add/contact', pathMatch: 'full' }
];
