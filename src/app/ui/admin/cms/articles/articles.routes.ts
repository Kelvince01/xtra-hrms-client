import {Routes} from '@angular/router';
import {authGuard} from '@core/guards';

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
  {
    path: 'editor',
    loadChildren: () =>
      import('./article-page/article-page.routes').then((article) => article.ARTICLE_EDIT_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.routes').then((m) => m.ARTICLE_ROUTES),
  },
];
