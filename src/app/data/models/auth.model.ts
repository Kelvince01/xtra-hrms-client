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

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
