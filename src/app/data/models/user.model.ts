import {BaseModel} from './base.model';

export interface UserModel extends BaseModel {
  username?: string;
  email: string;
  phone: string;
  password: string;
  permissions: string[];
  avatar?: string | null;
  bio?: string;
  token?: string;
}

export interface UserResponse {
  user: UserModel;
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

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  username: string;
  bio: string;
  image: string;
  loading: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}
