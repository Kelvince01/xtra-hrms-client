import { Injectable, inject } from '@angular/core';
import { WindowService } from '@shared/services/window.service';
import { Observable, of } from 'rxjs';

export interface TokenObject {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageJwtService {
  #windowService = inject(WindowService);

  getItem(): Observable<TokenObject | null> {
    if (window.localStorage) {
      const data = this.#windowService.getLocalStorageObject('xtra-hrms-token');
      if (data) {
        return of(data);
      }
    }

    return of(null);
  }

  setItem(data: object): Observable<any> {
    this.#windowService.setLocalStorageObject('xtra-hrms-token', data);
    return of(data);
  }

  removeItem(): Observable<boolean> {
    this.#windowService.removeLocalStorage('xtra-hrms-token');
    return of(true);
  }
}
