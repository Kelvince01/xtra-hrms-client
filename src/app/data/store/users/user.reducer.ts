import { ActionReducer, createReducer, on } from '@ngrx/store';
import { addUser, deleteUser } from './user.action';
import { UserState, adapter, initialState } from './user.state';

export const userReducers: ActionReducer<UserState> = createReducer(
  initialState,
  on(addUser, (state: UserState, { user }) => adapter.addOne(user, state)),
  on(deleteUser, (state: UserState, { id }) => adapter.removeOne(id, state)),
);
