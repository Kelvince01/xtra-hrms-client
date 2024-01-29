import {Routes} from '@angular/router';
import {PermissionListComponent} from './permission-list/permission-list.component';
import {PermissionAssignComponent} from './permission-assign/permission-assign.component';
import {PermissionPageComponent} from './permission-page/permission-page.component';

export const permissionsRoutes: Routes = [
  {
    path: '',
    component: PermissionListComponent,
  },
  {
    path: 'add',
    component: PermissionPageComponent,
  },
  {
    path: 'edit/:id',
    component: PermissionPageComponent,
  },
  {
    path: 'assign',
    component: PermissionAssignComponent,
  },
];
