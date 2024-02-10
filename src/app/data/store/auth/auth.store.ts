import {signalStore, withState, withMethods, patchState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {inject} from '@angular/core';
import {exhaustMap, pipe, switchMap, tap} from 'rxjs';
import {concatLatestFrom, tapResponse} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {authInitialState, AuthState, initialUserValue} from './auth.state';
import {AuthService} from '@data/services';
import {LocalStorageJwtService} from '@shared/services';
import {ngrxFormsQuery} from '@stores/forms';
import {formsActions} from '@stores/forms';
import Swal from 'sweetalert2';
import {ILoginResponse} from '@data/models/accounts.model';

export const AuthStore = signalStore(
  {providedIn: 'root'},
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
          tap((user) => patchState(store, {user, isAuthenticated: true})),
        ),
      ),
      login: rxMethod<void>(
        pipe(
          concatLatestFrom(() => reduxStore.select(ngrxFormsQuery.selectData)),
          exhaustMap(([, data]) =>
            authService.login(data).pipe(
              tapResponse({
                next: (token: ILoginResponse) => {
                  localStorageService.setItem(token);

                  pipe(
                    switchMap(() => authService.getCurrentUser()),
                    tap((user) => patchState(store, {user, isAuthenticated: true})),
                  );

                  Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back!`,
                    customClass: {
                      confirmButton: 'sweetAlertButton',
                    },
                  });
                  router.navigateByUrl('/');
                },
                error: ({error}) =>
                  reduxStore.dispatch(formsActions.setErrors({errors: error.errors})),
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
                next: (user) => {
                  patchState(store, {user, isAuthenticated: true});
                  localStorageService.setItem(user!);
                  Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: `Welcome to Xtra HRMS!`,
                    customClass: {
                      confirmButton: 'sweetAlertButton',
                    },
                  });
                  router.navigateByUrl('/');
                },
                error: ({error}) =>
                  reduxStore.dispatch(formsActions.setErrors({errors: error.errors})),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        patchState(store, {user: initialUserValue, isAuthenticated: false});
        localStorageService.removeItem();
        router.navigateByUrl('accounts/sign-in');
      },
    }),
  ),
);
