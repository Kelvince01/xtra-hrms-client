/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export class CrudService<T> {
  protected readonly apiUrl = `${this.baseUrl}/${this.entityname}/`;
  constructor(
    protected readonly http: HttpClient,
    protected readonly entityname: string,
    protected readonly baseUrl: string = environment.BASE_API_URL,
  ) {}

  fetchEntities(query?: { [key: string]: string }): Observable<T[]> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<T[]>(this.apiUrl, { params });
  }

  createEntity(body: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, body);
  }

  fetchEntity(id: number): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.get<T>(url);
  }

  updateEntity(id: number, body: T): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.put<T>(url, body);
  }

  deleteEntity(id: number): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.delete<T>(url);
  }

  protected entityUrl(id: number): string {
    return [this.apiUrl, id].join('/');
  }
}
