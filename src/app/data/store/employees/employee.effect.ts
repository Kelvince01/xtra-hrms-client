import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import {ngrxFormsQuery} from "../forms/forms.selectors";
import {formsActions} from "../forms/forms.actions";
import {articleEditActions, articleListActions, articlesActions} from "./employee.action";
import {articleListQuery} from "./employee.selector";
import { EmployeesService } from '../../services/employees.service';

/*export const publishArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesService = inject(EmployeesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) =>
        articlesService.publishArticle(data).pipe(
          tap((result) => router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    );
  },
  { functional: true },
);*/

export const setListPage$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListPage),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);

export const setListTag$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListConfig),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);

/*export const loadArticles$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleListActions.loadArticles),
      concatLatestFrom(() => store.select(articleListQuery.selectListConfig)),
      concatMap(([_, config]) =>
        articlesService.query(config).pipe(
          map((results) =>
            articleListActions.loadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount,
            }),
          ),
          catchError((error) => of(articleListActions.loadArticlesFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const favorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articlesActions.favorite),
      concatMap(({ slug }) =>
        actionsService.favorite(slug).pipe(
          map((response) => articlesActions.favoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.favoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unFavorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articlesActions.unfavorite),
      concatMap(({ slug }) =>
        actionsService.unfavorite(slug).pipe(
          map((response) => articlesActions.unfavoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.unfavoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);*/
