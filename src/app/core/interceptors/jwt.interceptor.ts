import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {LocalStorageJwtService} from "../../shared/services/local-storage-jwt.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let token: string | null = null;
  inject(LocalStorageJwtService)
    .getItem()
    .subscribe((t) => (token = t));

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
  }
  return next(request);
};
