import {IUser} from '@data/models';

export interface AuthState {
  token: string;
  // error message
  error: string;
  // is a user authenticated?
  isAuthenticated: boolean;
  isLoading: boolean;
  // if authenticated, there should be a user object
  user: IUser;
}

export const initialUserValue: IUser = {
  photoURL: undefined,
  password: '',
  roles: [],
  phone_no: '',
  email: '',
  username: '',
  bio: '',
  photo: '',
};

export const authInitialState: AuthState = {
  token: '',
  error: '',
  isAuthenticated: false,
  isLoading: false,
  user: initialUserValue,
};
