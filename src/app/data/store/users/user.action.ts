import {IUser} from '@data/models';
import {createAction, createActionGroup, props} from '@ngrx/store';

export const usersKey = '[Users]';

export const addUser = createAction(`${usersKey} Add User`, props<{user: IUser}>());

export const updateUser = createAction(`${usersKey} Update User`, props<{user: IUser}>());
export const updateUserSuccess = createAction(`${usersKey} Update User Success`);
export const updateUserError = createAction(`${usersKey} Update User Error`);

export const deleteUser = createAction(`${usersKey} Delete User`, props<{id: number}>());
export const deleteUserSuccess = createAction(`${usersKey} Delete User Success`);
export const deleteUserError = createAction(`${usersKey} Delete User Error`);

export const UsersApiActions = createActionGroup({
  source: 'users',
  // name: 'Users API',
  events: {
    usersLoadedSuccess: props<{users: IUser[]}>(),
    usersLoadedFailure: props<{error: string}>(),
  },
});

export const UsersPageActions = createActionGroup({
  source: 'users',
  events: {
    opened: props<{opened: boolean}>(),
  },
});

// // generated action creators:
// const {
//   usersLoadedSuccess, // type: "[Users API] usersLoadedSuccess"
//   usersLoadedFailure, // type: "[Users API] usersLoadedFailure"
// } = UsersApiActions;
