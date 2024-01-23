import { createAction, props } from '@ngrx/store';
import {UserModel} from "../../models/user.model";

export const usersKey = '[Users]';

export const addUser = createAction(
  `${usersKey} Add User`,
  props<{ user: UserModel }>()
);

export const deleteUser = createAction(
  `${usersKey} Delete User`,
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  `${usersKey} Delete User Success`
);

export const deleteUserError = createAction(
  `${usersKey} Delete User Error`
);
