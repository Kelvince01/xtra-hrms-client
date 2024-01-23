import { createReducer, on } from '@ngrx/store';
import {login, loginSuccess, loginFailure, setToken, removeToken, setUser} from './auth.action';
import {AuthState, authInitialState} from "./auth.state";

export const authReducer = createReducer(authInitialState,
  on(login, state => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, { token }) => ({ ...state, token, isLoading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(setToken, (state, { token }): AuthState => ({ ...state, token })),
  on(removeToken, (state): AuthState => ({ ...state, token: "" })),
  on(setUser, (state, { user }): AuthState => ({ ...state, user }))
);
