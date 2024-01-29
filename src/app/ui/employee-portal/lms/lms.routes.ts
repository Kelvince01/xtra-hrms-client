import {Routes} from '@angular/router';

export const lmsRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./leaves/leaves.routes').then((r) => r.leavesRoutes),
  },
];
