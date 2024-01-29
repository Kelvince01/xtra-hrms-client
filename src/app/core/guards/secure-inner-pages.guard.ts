import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagesGuard implements CanActivate {
  router = inject(Router);
  // authService = inject(OAuthService);
  snackBar = inject(MatSnackBar);
  jwtHelper = inject(JwtHelperService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is already logged in and the token is not expired
    // if (
    //   this.authService.getToken() &&
    //   !this.jwtHelper.isTokenExpired(this.authService.getToken())
    // ) {
    //   this.snackBar.open('Access Denied, You are already logged in!', '❌');
    //   this.router.navigate(['/'], {
    //     queryParams: {returnUrl: state.url},
    //   });
    // }
    return true;
  }
}
