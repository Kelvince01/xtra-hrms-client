import {Routes} from '@angular/router';

export const orgsRoutes: Routes = [
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.routes').then((r) => r.assetsRoutes),
  },
];
