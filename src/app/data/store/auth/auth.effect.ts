import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {map, catchError, switchMap} from 'rxjs/operators';
import {mergeMap, of, tap} from 'rxjs';
import {loginSuccess, loginFailure, setUser, logout, login, setToken} from './auth.action';
import {AuthService} from '@data/services';
import {Router} from '@angular/router';
import {LocalStorageJwtService} from '@shared/services';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({email, password}) =>
        this.authService.login({email, password}).pipe(
          map((token) => loginSuccess({token: token.access})),
          catchError((error) => of(loginFailure({error}))),
        ),
      ),
    );
  });

  // on login, send auth data to backend,
  // get the token and put into the store and cookies
  login$2 = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(({email, password}) => {
        return this.authService.login({email, password}).pipe(
          tap((token) => this.cookieService.setItem(token)),
          map(({access}) => setToken({token: access})),
          catchError(() => of(loginFailure({error: 'Login failed'}))),
        );
      }),
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
          this.cookieService.removeItem();
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
        return this.authService.getCurrentUser().pipe(
          map((user) => setUser({user})),
          catchError(() => of(loginFailure({error: 'Error'}))),
        );
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: LocalStorageJwtService,
  ) {}
}
