/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ArticleListConfig} from './article.reducer';
import {IArticle} from '@models/cms.model';

export const articleEditActions = createActionGroup({
  source: 'Article Edit',
  events: {
    publishArticle: emptyProps(),
    publishArticleSuccess: emptyProps(),
  },
});

export const articleListActions = createActionGroup({
  source: 'Article List',
  events: {
    setListPage: props<{page: number}>(),
    setListConfig: props<{config: ArticleListConfig}>(),
    loadArticles: emptyProps(),
    loadArticlesFailure: props<{error: Error}>(),
    loadArticlesSuccess: props<{articles: IArticle[]; articlesCount: number}>(),
  },
});

export const articlesActions = createActionGroup({
  source: 'Articles',
  events: {
    favorite: props<{slug: string}>(),
    favoriteFailure: props<{error: Error}>(),
    favoriteSuccess: props<{article: IArticle}>(),
    unfavorite: props<{slug: string}>(),
    unfavoriteFailure: props<{error: Error}>(),
    unfavoriteSuccess: props<{article: IArticle}>(),
  },
});
