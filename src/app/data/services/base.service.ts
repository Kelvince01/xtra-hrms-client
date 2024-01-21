import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paginated} from "../models/paginated-data.model";

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
    return `${this.collectionName}/`;
  }

  constructor() { }

  create(dto: T): Observable<T> {
    return this.#http.post<T>(`${`${this.url}`}`, dto);
  }

  get(): Observable<Paginated<T>> {
    return this.#http.get<Paginated<T>>(`${this.url}`);
  }

  getPaginated(): Observable<Paginated<T>> {
    return this.#http.get<Paginated<T>>(`${this.url}`);
  }
}
