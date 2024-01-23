import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, value)
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
}
