import {IUser} from '@data/models';
import {createAction, props} from '@ngrx/store';

export const usersKey = '[Users]';

export const addUser = createAction(`${usersKey} Add User`, props<{user: IUser}>());

export const updateUser = createAction(`${usersKey} Update User`, props<{user: IUser}>());

export const deleteUser = createAction(`${usersKey} Delete User`, props<{id: number}>());

export const deleteUserSuccess = createAction(`${usersKey} Delete User Success`);

export const deleteUserError = createAction(`${usersKey} Delete User Error`);
