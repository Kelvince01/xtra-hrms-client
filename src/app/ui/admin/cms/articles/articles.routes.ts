import {Routes} from '@angular/router';

export const articlesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./article-list/article-list.component').then((c) => c.ArticleListComponent),
    data: {revalidate: 60},
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./article-page/article-page.component').then((c) => c.ArticlePageComponent),
    data: {revalidate: 60},
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./article-page/article-page.component').then((c) => c.ArticlePageComponent),
    data: {revalidate: 60},
  },
];
