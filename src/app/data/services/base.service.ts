import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paginated} from '@data/models';
import {BaseApiClient} from '@services/base-api-client';
import {ApiConfiguration} from '@core/providers';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> extends BaseApiClient {
  protected abstract collectionName?: string;

  /**
   * Path part for operation getObjects
   */
  protected get url(): string {
    return `${this.rootUrl + this.collectionName}/`;
  }

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  create(dto: T): Observable<T> {
    return this.http.post<T>(`${this.url}`, JSON.stringify(dto), {headers: this.headers});
  }

  createMany(dtos: T[]) {
    dtos.forEach((dto) => {
      return this.http.post<T>(`${this.url}`, JSON.stringify(dto), {headers: this.headers});
    });
  }

  get(params: HttpParams = new HttpParams()): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}`, {
      headers: this.headers,
      params,
    });
  }

  getPaginated(params: HttpParams = new HttpParams()): Observable<Paginated<T>> {
    return this.http.get<Paginated<T>>(`${this.url}`, {
      headers: this.headers,
      params,
    });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url + id}/`, {headers: this.headers});
  }

  update(dto: T): Observable<T> {
    return this.http.put<T>(`${`${this.url}`}`, JSON.stringify(dto), {headers: this.headers});
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url + id}`, {headers: this.headers});
  }

  deleteMany(ids: number[]) {
    ids.forEach((id) => {
      return this.http.delete<T>(`${this.url + id}`, {headers: this.headers});
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
