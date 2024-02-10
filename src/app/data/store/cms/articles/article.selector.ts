/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createSelector} from '@ngrx/store';
import {articleListFeature} from './article.reducer';

const {selectArticlesListState, selectArticles, selectListConfig} = articleListFeature;
export const selectArticleEntities = createSelector(
  selectArticles,
  (articles) => articles.entities,
);
export const selectArticlesCount = createSelector(
  selectArticles,
  (articles) => articles.articlesCount,
);
export const isLoading = createSelector(selectArticles, (articles) => articles.loading);
export const selectTotalPages = createSelector(
  selectArticlesCount,
  selectListConfig,
  (articlesCount, config) => {
    return Array.from(
      new Array(Math.ceil(articlesCount / (config?.filters?.limit ?? 1))),
      (val, index) => index + 1,
    );
  },
);

export const articleListQuery = {
  selectArticlesListState,
  selectArticles,
  selectArticleEntities,
  selectListConfig,
  selectArticlesCount,
  isLoading,
  selectTotalPages,
};
