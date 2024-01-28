import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsAuth} from '@stores/auth/auth.selector';
import {Observable, map, take} from 'rxjs';
import {LocalStorageJwtService} from '@shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ) {
    return this.store.select(selectIsAuth).pipe(
      map((isAuth) => {
        return isAuth ? true : this.router.parseUrl('/accounts/sign-in');
      }),
    );
  }
}

export const authGuard = (): Observable<boolean | UrlTree> => {
  const storage = inject(LocalStorageJwtService);
  const router = inject(Router);

  return storage.getItem().pipe(
    map((token) => {
      if (!token) {
        return router.parseUrl('/accounts/sign-in');
      }
      return true;
    }),
    take(1),
  );
};

/*
 // canActivate: [AuthGuard],
export const AuthGuardv2: CanActivateFn = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route: ActivatedRouteSnapshot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {

  return inject(TokenService).authenticated()
    ? true
    : inject(Router).createUrlTree(['/auth/login']);

};*/
