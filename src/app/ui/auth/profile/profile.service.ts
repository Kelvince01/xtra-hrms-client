import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '@data/services';
import {IUser, UserResponse} from '@data/models';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly apiService = inject(ApiService);

  update(user: IUser): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UserResponse>('/user', {user});
  }
}
