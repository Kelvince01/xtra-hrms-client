import {Observable, of} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {WindowService} from '@shared/services/window.service';

@Injectable({providedIn: 'root'})
export class LocalStorageJwtService {
  #windowService = inject(WindowService);

  getItem(): Observable<string | null> {
    const data = this.#windowService.getLocalStorage('xtra-hrms-token');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setItem(data: string): Observable<string> {
    this.#windowService.setLocalStorage('xtra-hrms-token', data);
    return of(data);
  }

  removeItem(): Observable<boolean> {
    this.#windowService.removeLocalStorage('xtra-hrms-token');
    return of(true);
  }
}
