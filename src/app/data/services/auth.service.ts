import {inject, Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {HttpClient} from "@angular/common/http";
import {
  EmailVerifyOtp,
  ForgotPassword,
  Login,
  PhoneVerifyOtp,
  Register,
  ResetPassword
} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #usersService = inject(UsersService);
  #http = inject(HttpClient);

  constructor() { }

  login(data: Login) {}

  register(data: Register) {}

  forgotPassword(data: ForgotPassword) {}

  resetPassword(data: ResetPassword) {}

  verifyOtp(data: EmailVerifyOtp | PhoneVerifyOtp) {}

  logOut() {}
}
