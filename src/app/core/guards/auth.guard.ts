import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LocalStorageJwtService } from '@shared/services';
import { Observable, map, take } from 'rxjs';

export const authGuard = (): Observable<boolean | UrlTree> => {
  const storage = inject(LocalStorageJwtService);
  const router = inject(Router);

  return storage.getItem().pipe(
    map(token => {
      if (!token) {
        return router.parseUrl('/accounts/sign-in');
      }
      return true;
    }),
    take(1),
  );
};
