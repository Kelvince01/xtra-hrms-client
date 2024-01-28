import {Routes} from '@angular/router';

export const recruitmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./recruitment-list/recruitment-list.component').then(
        (c) => c.RecruitmentListComponent,
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./recruitment-page/recruitment-page.component').then(
        (c) => c.RecruitmentPageComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./recruitment-page/recruitment-page.component').then(
        (c) => c.RecruitmentPageComponent,
      ),
  },
];
