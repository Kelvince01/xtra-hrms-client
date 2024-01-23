import {UserModel} from "../../models/user.model";

export interface AuthState {
  token: string;
  // error message
  error: string;
  // is a user authenticated?
  isAuthenticated: boolean;
  isLoading: boolean;
  // if authenticated, there should be a user object
  user: UserModel;
}

export const initialUserValue: UserModel = {
  password: "",
  permissions: [],
  phone: "",
  email: '',
  username: '',
  bio: '',
  avatar: ''
};

export const authInitialState: AuthState = {
  token: "",
  error: '',
  isAuthenticated: false,
  isLoading: false,
  user: initialUserValue
};
