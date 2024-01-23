import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import {catchError, Observable, throwError} from "rxjs";
import {errorHandlerActions} from "../../data/store/error-handler/error-handler.actions";

export const errorHandlingInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const store = inject(Store);

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            store.dispatch(errorHandlerActions.throw401Error({ error }));
            break;
          case 404:
            store.dispatch(errorHandlerActions.throw404Error({ error }));
            break;
          default:
            throwError(error);
            break;
        }
      }
      return throwError(error);
    }),
  );
};