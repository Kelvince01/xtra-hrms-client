import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { concatLatestFrom, tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {authInitialState, AuthState, initialUserValue} from "./auth.state";
import {AuthService} from "../../services/auth.service";
import {LocalStorageJwtService} from "../../../shared/services/local-storage-jwt.service";
import { ngrxFormsQuery } from '../forms/forms.selectors';
import { formsActions } from '../forms/forms.actions';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (
      store,
      reduxStore = inject(Store),
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageJwtService),
      router = inject(Router),
    ) => ({
      getUser: rxMethod<void>(
        pipe(
          switchMap(() => authService.user()),
          tap(({ user }) => patchState(store, { user, isAuthenticated: true })),
        ),
      ),
      login: rxMethod<void>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          exhaustMap(([, data]) =>
            authService.login(data).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user, isAuthenticated: true });
                  localStorageService.setItem(user.token);
                  router.navigateByUrl('/');
                },
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      register: rxMethod<void>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          exhaustMap(([, data]) =>
            authService.register(data).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user, isAuthenticated: true });
                  localStorageService.setItem(user.token);
                  router.navigateByUrl('/');
                },
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        patchState(store, { user: initialUserValue, isAuthenticated: false });
        localStorageService.removeItem();
        router.navigateByUrl('accounts/sign-in');
      },
    }),
  ),
);
