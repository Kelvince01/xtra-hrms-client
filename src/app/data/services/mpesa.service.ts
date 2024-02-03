/*
 * Copyright (c) 2024.  Kelvince Phillips
 */

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorHandler} from '@shared/services/http-error-handler.service';
import {catchError, Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';

@Injectable()
export class MpesaService {
  collectionName = 'mpesa';
  http = inject(HttpClient);
  eh = inject(HttpErrorHandler);

  protected get url(): string {
    return `${environment.BASE_API_URL}${this.collectionName}/`;
  }

  submit(dto?: any): Observable<any> {
    return this.http
      .post<any>(this.url, dto, {
        observe: 'response',
      })
      .pipe(catchError(this.eh.handleError));
  }

  confirm(dto?: any): Observable<any> {
    return this.http
      .post<any>(this.url, dto, {
        observe: 'response',
      })
      .pipe(catchError(this.eh.handleError));
  }

  checkOnline(dto?: any): Observable<any> {
    return this.http
      .post<any>(this.url, dto, {
        observe: 'response',
      })
      .pipe(catchError(this.eh.handleError));
  }

  checkTransaction(dto?: any): Observable<any> {
    return this.http
      .post<any>(this.url, dto, {
        observe: 'response',
      })
      .pipe(catchError(this.eh.handleError));
  }
}
