import {Routes} from '@angular/router';
import {LeaveListComponent} from './leave-list/leave-list.component';

export const leavesRoutes: Routes = [
  {
    path: '',
    component: LeaveListComponent,
  },
];
