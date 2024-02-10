import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap, of, tap} from 'rxjs';
import {UsersService} from '@data/services';
import {
  UsersApiActions,
  UsersPageActions,
  deleteUser,
  deleteUserError,
  deleteUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from '@data/store';

export const loadUsers = createEffect(
  (actions$ = inject(Actions), usersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(UsersPageActions.opened),
      exhaustMap(() =>
        usersService.get().pipe(
          map((users) => UsersApiActions.usersLoadedSuccess({users})),
          catchError((error) => of(UsersApiActions.usersLoadedFailure({error}))),
        ),
      ),
    );
  },
  {functional: true},
);

export const deleteUser$ = createEffect(
  (actions$: Actions = inject(Actions), usersService: UsersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(deleteUser),
      mergeMap(({id}) =>
        usersService.delete(id).pipe(
          map(() => deleteUserSuccess()),
          catchError(() => [deleteUserError()]),
        ),
      ),
    );
  },
  {functional: true},
);

export const updateUser$ = createEffect(
  (actions$: Actions = inject(Actions), usersService: UsersService = inject(UsersService)) => {
    return actions$.pipe(
      ofType(updateUser),
      mergeMap(({user}) =>
        usersService.update(user).pipe(
          map(() => updateUserSuccess()),
          catchError(() => [updateUserError()]),
        ),
      ),
    );
  },
  {functional: true},
);

export const displayErrorAlert = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(UsersApiActions.usersLoadedFailure),
      tap(({error}) => alert(error)),
    );
  },
  {functional: true, dispatch: false},
);
