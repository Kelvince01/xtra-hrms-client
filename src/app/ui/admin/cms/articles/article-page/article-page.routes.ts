/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Routes} from '@angular/router';
import {ArticlePageComponent} from './article-page.component';
import {provideEffects} from '@ngrx/effects';
import {articleEffects} from '@data/store/cms/articles';
import {authGuard} from '@core/guards';
import {articleEditResolver} from './resolvers/article-edit.resolver';

export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticlePageComponent,
    providers: [provideEffects(articleEffects)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticlePageComponent,
        canActivate: [authGuard],
      },
      {
        path: ':slug',
        component: ArticlePageComponent,
        resolve: {articleEditResolver},
      },
    ],
  },
];
