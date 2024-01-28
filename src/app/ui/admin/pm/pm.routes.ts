import {Routes} from '@angular/router';

export const pmRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./projects/projects.routes').then((r) => r.projectsRoutes);
    },
  },
];
