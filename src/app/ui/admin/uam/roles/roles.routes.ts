import {Routes} from '@angular/router';
import {RoleListComponent} from './role-list/role-list.component';
import {RolePageComponent} from './role-page/role-page.component';

export const rolesRoutes: Routes = [
  {
    path: '',
    component: RoleListComponent,
  },
  {
    path: 'add',
    component: RolePageComponent,
  },
  {
    path: 'edit/:id',
    component: RolePageComponent,
  },
];
