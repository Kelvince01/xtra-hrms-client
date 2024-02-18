/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { Routes } from '@angular/router';
import { articleEffects } from '@data/store/cms/articles';
import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './article.component';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    providers: [provideEffects(articleEffects)],
  },
];
