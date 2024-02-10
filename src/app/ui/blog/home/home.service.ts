import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';

@Injectable({providedIn: 'root'})
export class HomeService {
  private readonly apiService = inject(ApiService);

  getTags(): Observable<{tags: string[]}> {
    return this.apiService.get('/tags');
  }
}
