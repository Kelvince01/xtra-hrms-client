import {BaseModel} from '@models/base.model';

export interface IUser extends BaseModel {
  permissions?: string[];
  client_id?: number;
  photoURL: any;
  photo: any;
  user_id?: string;
  email: string;
  password?: string;
  roles: string[];
  token?: string;
  username?: string;
  phone_no?: string;
  bio?: string;
  is_superuser?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  is_hod?: boolean;
  is_hr?: boolean;
  is_cfo?: boolean;
  is_ceo?: boolean;
  password_changed?: boolean;
  date_joined?: Date;
  preferred_comm?: string;
  failed_login_attempts?: number;
  is_locked?: boolean;
  is_admin?: boolean;
  last_login?: Date;
  is_verified?: boolean;
  qr_code?: any;
  otpauth_url?: string;
  otp_base32?: string;
  login_otp?: string;
  login_otp_used?: boolean;
  otp_created_at?: Date;
  registration_method?: string;

  login_point?: string;
  duration?: string;
  employee?: number;
}

export interface User extends BaseModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export interface IPermission extends BaseModel {
  namespace?: string;
  name: string;
}

export interface PermissionModel extends BaseModel {
  name: string;
  namespace: string;
}

export interface IRole extends BaseModel {
  description?: string; // Optional
  name: string;
  permissions: number[];
  groups?: number[];

  client_id?: number;
  user_category?: number;
  revoked?: boolean;
}

export interface IProfile extends BaseModel {
  user?: number;
  org?: number;
  phone_no?: string;
  alternate_phone?: string;
  address?: number;
  has_sales_access?: boolean;
  has_marketing_access?: boolean;
  is_active?: boolean;
  is_organization_admin?: boolean;
  date_of_joining?: Date;

  username?: string;
  bio?: string;
  photo?: string;
  image?: string;
  email?: string;
  following?: boolean;
}

export interface IGoogle extends BaseModel {
  user?: number;
  google_id?: string;
  google_url?: string;
  verified_email?: string;
  family_name?: string;
  name?: string;
  gender?: string;
  dob?: string;
  given_name?: string;
  email?: string;
}

/**
 * Login Request Credentials
 * @description Plain object used for logging in
 */
export interface ILogin {
  email: string;
  phone?: string;
  password: string;
}

/*
Interface for the Login Response (can look different, based on your backend api)
*/
export interface ILoginResponse {
  refresh: string;
  access: string;
  token_type?: string;
}

/*
Interface for the Refresh Token (can look different, based on your backend api)
*/
export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface IRegister {
  email: string;
  password: string;
  phone: string;
  username?: string;
  firstname?: string;
  lastname?: string;
}

/*
Interface for the Register Response (can look different, based on your backend api)
*/
export interface RegisterResponse {
  status: number;
  message: string;
}

export interface LoggedInUser {
  id: number;
  token: string;
  username: string;
}

export interface NewUser {
  username: string;
  phone_no: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UpdateUser {
  phone_no?: string;
  email?: string | null;
  password?: string | null;
  username?: string | null;
  bio?: string | null;
  image?: string | null;
}

export interface IForgotPasswordResponse {
  success?: boolean;
  message?: string;
  body?: any;
  result?: any;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPassword {
  old_password: string;
  new_password: string;
}

export interface UserInterface {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface NewUserRequest {
  user: NewUser;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  user: LoginUser;
}

export interface LoginUser {
  email: string;
  password: string;
}

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
  user: IUser;
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
  email?: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
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
