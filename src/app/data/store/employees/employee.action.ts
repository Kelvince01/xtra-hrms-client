import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ArticleListConfig} from './employee.reducer';
import {EmployeeModel} from '@data/models';

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
    loadArticlesSuccess: props<{articles: EmployeeModel[]; articlesCount: number}>(),
  },
});

export const articlesActions = createActionGroup({
  source: 'Articles',
  events: {
    favorite: props<{slug: string}>(),
    favoriteFailure: props<{error: Error}>(),
    favoriteSuccess: props<{article: EmployeeModel}>(),
    unfavorite: props<{slug: string}>(),
    unfavoriteFailure: props<{error: Error}>(),
    unfavoriteSuccess: props<{article: EmployeeModel}>(),
  },
});
