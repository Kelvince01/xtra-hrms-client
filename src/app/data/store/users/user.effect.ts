import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs';
import {UsersService} from '@data/services';
import {deleteUser, deleteUserError, deleteUserSuccess} from './user.action';

export const deleteMessage$ = createEffect(
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
