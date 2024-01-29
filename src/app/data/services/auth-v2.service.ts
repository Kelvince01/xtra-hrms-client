import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UserResponse} from '@data/models';
import {LoginUser, LoginUserRequest, NewUser, NewUserRequest} from '@data/models';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly apiService = inject(ApiService);

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/auth/login', {user: credentials});
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', {user: credentials});
  }
}
