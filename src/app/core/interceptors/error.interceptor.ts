import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, retry, throwError} from 'rxjs';
import {IAppLog} from '@models/app-log.model';
import {LogLevel} from '@data/types/logger.type';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggerService} from '@core/log/logger.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggerService);
  const snackBar = inject(MatSnackBar);

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
