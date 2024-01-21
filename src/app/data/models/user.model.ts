import {BaseModel} from "./base.model";

export interface UserModel extends BaseModel {
  email: string;
  phone: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface PhoneLogin {
  phone: string;
  password: string;
}

export interface Register {
  email: string;
  phone: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  old_password: string;
  new_password: string;
}

export interface PhoneVerifyOtp {
  phone: string;
}

export interface EmailVerifyOtp {
  email: string;
}

export interface Profile {
  email: string;
  name: string;
}
