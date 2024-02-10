/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as actions from './role.action';
import {RolesService} from '@data/services';

@Injectable()
export class RoleEffects {
  getRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getRoles),
      mergeMap(() =>
        this.rolesService.get().pipe(
          map((users) => actions.getRolesSuccess({users})),
          catchError((error) => of(actions.getRolesError({error}))),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private rolesService: RolesService,
  ) {}
}
