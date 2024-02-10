import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, retry, throwError} from 'rxjs';
import {IAppLog} from '@models/app-log.model';
import {LogLevel} from '@data/types/logger.type';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggerService} from '@core/log/logger.service';
import {Store} from '@ngrx/store';
import {errorHandlerActions} from '@stores/error-handler';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggerService);
  const snackBar = inject(MatSnackBar);
  const store = inject(Store);

  return next(req).pipe(
    retry(1),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      switch (error.status) {
        case 401:
          store.dispatch(errorHandlerActions.throw401Error({error}));
          break;
        case 404:
          store.dispatch(errorHandlerActions.throw404Error({error}));
          break;
        default:
          throwError(error);
          break;
      }

      const errorData: IAppLog = {
        message: error.name,
        type: LogLevel.error,
        description: error.error,
        source: 'Error Interceptor',
        name: error.name,
      };

      loggerService.log(errorData);

      // next show a friendly message
      snackBar.open(errorMessage, 'Dismiss', {
        duration: 2000,
      });

      return throwError(errorMessage);
    }),
  );
};
