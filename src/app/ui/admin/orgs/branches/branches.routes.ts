import {Routes} from '@angular/router';

export const BRANCHES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./branch-list/branch-list.component').then((c) => c.BranchListComponent),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./branch-page/branch-page.component').then((c) => c.BranchPageComponent),
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./branch-page/branch-page.component').then((c) => c.BranchPageComponent),
    data: {revalidate: 60},
  },
];
