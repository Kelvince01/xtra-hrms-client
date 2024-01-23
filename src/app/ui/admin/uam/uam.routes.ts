import {Routes} from "@angular/router";

export const uamRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(c => c.UsersComponent),
    loadChildren: () => import('./users/users.routes').then(r => r.usersRoutes)
  }
]
