import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import {mergeMap, of, tap} from 'rxjs';
import {loginSuccess, loginFailure, setUser, logout, login, setToken} from './auth.action';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import {CookieService} from "../../../shared/services/cookie.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({ email, password }) =>
        this.authService.login({email, password}).pipe(
          map(token => loginSuccess({ token })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    ) }
  );

  // on login, send auth data to backend,
  // get the token and put into the store and cookies
  login$2 = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) => {
        return this.authService.login({email, password}).pipe(
          tap(({ token }) => this.cookieService.set("token", token)),
          map(({ token }) => setToken({ token })),
          catchError(() => of(loginFailure({ error: "Login failed" })))
        );
      })
    );
  });

  // on logout, just remove the token
  // and navigate to login page
  // no need to dispatch any actions after that
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.cookieService.remove("token");
          this.router.navigateByUrl("/login");
        })
      );
    },
    { dispatch: false }
  );

  // when app has started, get the user data
  // using the token from cookies
  // and put into the store
  // init$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROOT_EFFECTS_INIT),
      // mergeMap(({ email, password }) => {
      //   return this.authService.getCurrentUser().pipe(
      //     map(({ token }) => setUser({ user })),
      //     catchError(() => of(setUserError({ message: "Error" })))
      //   );
      // })
  //   );
  // });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}
}
