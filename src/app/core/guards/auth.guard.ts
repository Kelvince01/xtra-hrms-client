import {inject} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable, map, take} from 'rxjs';
import {LocalStorageJwtService} from '@shared/services';

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
