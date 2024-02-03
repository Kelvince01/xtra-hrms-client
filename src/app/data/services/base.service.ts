import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paginated} from '@data/models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  protected abstract collectionName?: string;
  #http = inject(HttpClient);

  /**
   * Path part for operation getObjects
   */
  protected get url(): string {
    return `${environment.BASE_API_URL + this.collectionName}/`;
  }

  constructor() {}

  create(dto: T): Observable<T> {
    return this.#http.post<T>(`${this.url}`, JSON.stringify(dto), {headers: this.headers});
  }

  createMany(dtos: T[]) {
    dtos.forEach((dto) => {
      return this.#http.post<T>(`${this.url}`, JSON.stringify(dto), {headers: this.headers});
    });
  }

  get(params: HttpParams = new HttpParams()): Observable<T[]> {
    return this.#http.get<T[]>(`${this.url}`, {
      headers: this.headers,
      params,
    });
  }

  getPaginated(params: HttpParams = new HttpParams()): Observable<Paginated<T>> {
    return this.#http.get<Paginated<T>>(`${this.url}`, {
      headers: this.headers,
      params,
    });
  }

  getById(id: number): Observable<T> {
    return this.#http.get<T>(`${this.url + id}/`, {headers: this.headers});
  }

  update(dto: T): Observable<T> {
    return this.#http.put<T>(`${`${this.url}`}`, JSON.stringify(dto), {headers: this.headers});
  }

  delete(id: number): Observable<T> {
    return this.#http.delete<T>(`${this.url + id}`, {headers: this.headers});
  }

  deleteMany(ids: number[]) {
    ids.forEach((id) => {
      return this.#http.delete<T>(`${this.url + id}`, {headers: this.headers});
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
