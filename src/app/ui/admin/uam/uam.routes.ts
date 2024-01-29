import {Routes} from '@angular/router';
import {rolesRoutes} from '@admin-ui/uam/roles/roles.routes';
import {permissionsRoutes} from '@admin-ui/uam/permissions/permissions.routes';

export const uamRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then((c) => c.UsersComponent),
    loadChildren: () => import('./users/users.routes').then((r) => r.usersRoutes),
  },
  {
    path: 'roles',
    children: rolesRoutes,
  },
  {
    path: 'permissions',
    children: permissionsRoutes,
  },
];
