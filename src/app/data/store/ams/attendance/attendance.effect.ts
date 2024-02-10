/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {map, catchError, switchMap} from 'rxjs/operators';
import {mergeMap, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {
  addAttendance,
  addAttendanceSuccess,
  deleteAttendance,
  setAttendance,
} from './attendance.action';
import {addAttendanceFailure} from '@stores/ams/attendance/attendance.action';
import {AttendanceService} from '@data/services';

@Injectable()
export class AttendanceEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAttendance),
      switchMap(({}) =>
        this.authService.create({}).pipe(
          map((token) => addAttendanceSuccess({token: token.attendance_overtime!})),
          catchError((error) => of(addAttendanceFailure({error}))),
        ),
      ),
    );
  });

  // on logout, just remove the token
  // and navigate to login page
  // no need to dispatch any actions after that
  delete$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteAttendance),
        tap(() => {
          this.router.navigateByUrl('/accounts/sign-in');
        }),
      );
    },
    {dispatch: false},
  );

  // when app has started, get the user data
  // using the token from cookies
  // and put into the store
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mergeMap(({email, password}) => {
        return this.authService.get().pipe(
          map((attendance) => setAttendance({attendance: attendance[0]})),
          catchError(() => of(addAttendanceFailure({error: 'Error'}))),
        );
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AttendanceService,
    private readonly router: Router,
  ) {}
}
