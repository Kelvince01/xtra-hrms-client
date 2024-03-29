import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageJwtService } from '@shared/services';
import { Observable } from 'rxjs';

export const tokenInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  let token: object | null = null;
  inject(LocalStorageJwtService)
    .getItem()
    .subscribe(t => (token = t));

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${(<any>token).access}`,
      },
    });
  }
  return next(request);
};
