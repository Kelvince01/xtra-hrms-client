import {inject, Injectable} from '@angular/core';
import {UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';
import {
  EmailVerifyOtp,
  ForgotPassword,
  Login,
  PhoneVerifyOtp,
  Register,
  ResetPassword,
  UserModel,
  UserResponse,
} from '@data/models';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #usersService = inject(UsersService);
  #http = inject(HttpClient);

  constructor() {}

  user(): Observable<UserResponse> {
    return of();
  }

  login(data: Login): Observable<any> {
    const url = `${environment.BASE_API_URL}auth/login/`;
    return this.#http.post<UserModel>(url, data);
  }

  register(data: Register): Observable<any> {
    const url = `${environment.BASE_API_URL}users/`;
    return this.#http.post<UserModel>(url, data);
  }

  forgotPassword(data: ForgotPassword) {}

  resetPassword(data: ResetPassword) {}

  verifyOtp(data: EmailVerifyOtp | PhoneVerifyOtp) {}

  logOut() {}

  getCurrentUser(): Observable<any> {
    return of();
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }
}
