/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createFeatureSelector, createReducer} from '@ngrx/store';
import {immerOn} from 'ngrx-immer/store';

import * as actions from './role.action';
import {IRole} from '@models/accounts.model';

export interface RoleState extends EntityState<IRole> {
  loading: boolean;
  error: string;
}

export const roleAdapter: EntityAdapter<IRole> = createEntityAdapter<IRole>();

const initialRoleState: RoleState = roleAdapter.getInitialState({
  loading: false,
  error: '',
});

const reducer = createReducer(
  initialRoleState,
  immerOn(actions.getRoles, (state) => {
    state.loading = true;
  }),
  immerOn(actions.getRolesSuccess, (state, {users}) =>
    roleAdapter.setAll(users, {
      ...state,
      loading: false,
    }),
  ),
  immerOn(actions.getRolesError, (state, {error}) => {
    state.loading = false;
    state.error = error;
  }),
);

export const roleReducer = (state: RoleState | undefined, action: Action) => reducer(state, action);

export const selectRoleState = createFeatureSelector<RoleState>('roles');
