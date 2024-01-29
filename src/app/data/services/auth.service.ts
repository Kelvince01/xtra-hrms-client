import {computed, inject, Injectable, signal} from '@angular/core';
import {UsersService} from './users.service';
import {HttpClient} from '@angular/common/http';
import {
  EmailVerifyOtp,
  ForgotPassword,
  IUser,
  Login,
  PhoneVerifyOtp,
  Register,
  ResetPassword,
  UserModel,
  UserResponse,
} from '@data/models';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {JwtHelperService} from '@auth0/angular-jwt';
import {WindowService} from '@shared/services';
import {ApiStatus} from '@data/types/api-status.type';
import {ILoginResponse} from '@models/accounts.model';

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #usersService = inject(UsersService);
  #http = inject(HttpClient);
  readonly #jwtHelper = inject(JwtHelperService);
  readonly #windowService = inject(WindowService);

  readonly #user = signal<IUser | null>(null);
  // readonly user = this.#user.asReadonly();
  readonly username = computed(() => this.#user()?.username || '');
  readonly #status = signal<AuthStatus>('idle');
  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly #apiStatus = signal<ApiStatus>('idle');
  readonly isLoading = computed(() => this.#apiStatus() === 'loading');

  constructor() {}

  user(): Observable<UserResponse> {
    this.getCurrentUser();
    return of(<UserResponse>{user: this.#user()});
  }

  login(data: Login): Observable<ILoginResponse> {
    const url = `${environment.BASE_API_URL}auth/login/`;
    return this.#http.post<ILoginResponse>(url, data);
  }

  register(data: Register): Observable<IUser> {
    const url = `${environment.BASE_API_URL}users/`;
    return this.#http.post<IUser>(url, data);
  }

  forgotPassword(data: ForgotPassword): Observable<any> {
    const url = `${environment.BASE_API_URL}auth/forgot-password/`;
    return this.#http.post<any>(url, data);
  }

  resetPassword(data: ResetPassword): Observable<any> {
    const url = `${environment.BASE_API_URL}auth/reset-passwor/`;
    return this.#http.post<any>(url, data);
  }

  verifyOtp(data: EmailVerifyOtp | PhoneVerifyOtp): Observable<any> {
    const url = `${environment.BASE_API_URL}auth/verify-otp/`;
    return this.#http.post<any>(url, data);
  }

  logOut() {
    if (!this.#windowService.isServer) {
      this.#windowService.removeLocalStorage('xtra-hrms-token');
      this.#windowService.removeLocalStorage('xtra-hrms-user');
      window.sessionStorage.removeItem('xtra-hrms-token');
    }
  }

  isTokenExpired(token: string) {
    return this.#jwtHelper.isTokenExpired(token);
  }

  getToken() {
    if (this.#windowService.isServer) return of();

    const token = this.#windowService.getLocalStorageObject('xtra-hrms-token');

    if (!token) {
      this.#user.set(null);
      this.#status.set('unauthenticated');
      return;
    }

    if (this.#jwtHelper.isTokenExpired(token.access)) {
      this.logOut();
      return;
    }

    if (this.#jwtHelper.isTokenExpired(token.refresh)) {
      return;
    }

    return token;
  }

  getCurrentUser(): Observable<IUser> {
    const token = this.getToken();

    const res = this.#jwtHelper.decodeToken(token.refresh!);
    let user: IUser = {email: '', photo: undefined, photoURL: undefined, roles: []};

    this.#usersService.getById(res.user_id).subscribe(
      (currentUserResponse) => {
        user = currentUserResponse;
        this.#user.set(currentUserResponse);
        this.#status.set(currentUserResponse ? 'authenticated' : 'unauthenticated');
        delete currentUserResponse['roles'][0];
        delete currentUserResponse['created_at'];
        delete currentUserResponse['is_verified'];
        delete currentUserResponse['photo'];
        delete currentUserResponse['id'];
        this.#windowService.setLocalStorageObject('xtra-hrms-user', currentUserResponse);
      },
      (error) => {
        console.error(`error refreshing user -->`, error);
        this.#user.set(null);
        return null;
      },
    );

    return of(user);
  }
}
