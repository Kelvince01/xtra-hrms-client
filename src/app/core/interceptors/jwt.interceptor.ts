import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {LocalStorageJwtService} from '@shared/services';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const authInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  let token: object | null = null;
  inject(LocalStorageJwtService)
    .getItem()
    .subscribe((t) => (token = t));

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${(<any>token).access}`,
      },
    });
  }
  return next(request);
};
