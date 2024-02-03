import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor() {}

  handleError(err: HttpErrorResponse): Observable<any> {
    let displayMessage = '';

    if (err.error instanceof ErrorEvent) {
      displayMessage = `Client-side error: ${err.error.message}`;
    } else {
      displayMessage = `Server-side error: ${err.message}`;
    }

    // eslint-disable-next-line no-console
    console.log(displayMessage);

    return throwError(() => new Error(displayMessage));
  }
}
