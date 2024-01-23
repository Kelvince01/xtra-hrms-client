import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paginated} from "../models/paginated-data.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected abstract collectionName?: string;
  #http = inject(HttpClient);

  /**
   * Path part for operation getObjects
   */
  private get url(): string {
    return `${environment.BASE_API_URL + this.collectionName}/`;
  }

  constructor() { }

  create(dto: T): Observable<T> {
    return this.#http.post<T>(`${this.url}`, dto);
  }

  get(): Observable<T[]> {
    return this.#http.get<T[]>(`${this.url}`);
  }

  getPaginated(): Observable<Paginated<T>> {
    return this.#http.get<Paginated<T>>(`${this.url}`);
  }

  getById(id: number): Observable<T> {
    return this.#http.get<T>(`${this.url + id}`);
  }

  update(dto: T): Observable<T> {
    return this.#http.put<T>(`${`${this.url}`}`, dto);
  }

  delete(id: number): Observable<T> {
    return this.#http.delete<T>(`${this.url + id}`);
  }
}
