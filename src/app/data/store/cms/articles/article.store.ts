/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {signalStore, withState, withMethods, patchState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {concatLatestFrom} from '@ngrx/effects';
import {ArticleState} from '@data/models/cms.model';
import {ArticlesService} from '@data/services';
import {ActionsService, CommentsService} from '@services/cms.service';
import {setLoaded, setLoading, withCallState} from '@stores/call-state.feature';
import {formsActions, ngrxFormsQuery} from '@stores/forms';

export const articleInitialState: ArticleState = {
  data: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    created_at: new Date(),
    updated_at: new Date(),
    favorited: false,
    favoritesCount: 0,
    Author: {
      username: '',
      bio: '',
      image: '',
      following: false,
      loading: false,
    },
  },
  comments: [],
};

export const ArticleStore = signalStore(
  {providedIn: 'root'},
  withState<ArticleState>(articleInitialState),
  withMethods(
    (
      store,
      articlesService = inject(ArticlesService),
      commentsService = inject(CommentsService),
      actionsService = inject(ActionsService),
      router = inject(Router),
      reduxStore = inject(Store),
    ) => ({
      getArticle: rxMethod<number>(
        pipe(
          tap(() => setLoading('getArticle')),
          switchMap((id) =>
            articlesService.getById(id).pipe(
              tapResponse({
                next: (article) => {
                  patchState(store, {data: article, ...setLoaded('getArticle')});
                },
                error: () => {
                  patchState(store, {data: articleInitialState.data, ...setLoaded('getArticle')});
                },
              }),
            ),
          ),
        ),
      ),
      getComments: rxMethod<string>(
        pipe(
          tap(() => setLoading('getComments')),
          switchMap((slug) =>
            commentsService.getComments(slug).pipe(
              tapResponse({
                next: ({comments}) => {
                  patchState(store, {comments: comments});
                  setLoaded('getComments');
                },
                error: () => {
                  patchState(store, {comments: articleInitialState.comments});
                  setLoaded('getComments');
                },
              }),
            ),
          ),
        ),
      ),
      followUser: rxMethod<string>(
        pipe(
          switchMap((username) => actionsService.followUser(username)),
          tap(({profile}) => patchState(store, {data: {...store.data(), Author: profile}})),
        ),
      ),
      unfollowUser: rxMethod<string>(
        pipe(
          switchMap((username) => actionsService.unfollowUser(username)),
          tap(({profile}) => patchState(store, {data: {...store.data(), Author: profile}})),
        ),
      ),
      deleteComment: rxMethod<{commentId: number; slug: string}>(
        pipe(
          switchMap(({commentId, slug}) =>
            commentsService.deleteComment(commentId, slug).pipe(
              tap(() =>
                patchState(store, {
                  comments: store.comments().filter((item) => item.id !== commentId),
                }),
              ),
            ),
          ),
        ),
      ),
      deleteArticle: rxMethod<number>(
        pipe(
          switchMap((id) =>
            articlesService.delete(id).pipe(
              tapResponse({
                next: () => router.navigate(['/']),
                error: () => patchState(store, articleInitialState),
              }),
            ),
          ),
        ),
      ),
      addComment: rxMethod<string>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          switchMap(([slug, data]) =>
            commentsService.addComment(slug, data.comment).pipe(
              tapResponse({
                next: () => patchState(store, {comments: [data.comment, ...store.comments()]}),
                error: ({error}) =>
                  reduxStore.dispatch(formsActions.setErrors({errors: error.errors})),
              }),
            ),
          ),
        ),
      ),
      initializeArticle: () => {
        patchState(store, articleInitialState);
      },
    }),
  ),
  withCallState({collection: 'getArticle'}),
  withCallState({collection: 'getComments'}),
);
