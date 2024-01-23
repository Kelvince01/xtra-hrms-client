import { createAction, props } from '@ngrx/store';
import {UserModel} from "../../models/user.model";

export const login = createAction(
  '[Login] User Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);

export const setToken = createAction(
  "[Auth] Set Token",
  props<{ token: string }>()
);

export const setUser = createAction(
  "[Auth] Set user",
  props<{ user: UserModel }>(),
);

export const removeToken = createAction("[Auth] Remove Token");

export const logout = createAction("[Auth] Log Out");

