import {Routes} from '@angular/router';

export const cmsRoutes: Routes = [
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.component').then((c) => c.ArticlesComponent),
    loadChildren: () => import('./articles/articles.routes').then((r) => r.articlesRoutes),
  },
];
