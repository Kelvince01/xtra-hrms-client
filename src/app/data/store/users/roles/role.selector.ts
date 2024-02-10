/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {selectRoleState, roleAdapter} from '@data/store';
import {createSelector} from '@ngrx/store';

const {
  selectIds: selectRoleIds,
  selectEntities: selectRoleEntities,
  selectAll: selectAllRoles,
  selectTotal: selectTotalRoles,
} = roleAdapter.getSelectors();

export const allRoles = createSelector(selectRoleState, selectAllRoles);

export const selectRolesByIds = (ids: Array<number> | undefined) =>
  createSelector(allRoles, (users) => {
    if (!!users && !!ids) {
      return users.filter((u) => ids.includes(u.id!));
    }

    return [];
  });

export const selectRoleById = (id: number | undefined) =>
  createSelector(allRoles, (roles) => {
    if (!!roles && !!id) {
      return roles.find((u) => u.id === id);
    }

    return null;
  });

// This just return the first user in the users list :)
export const selectCurrentRole = createSelector(allRoles, (roles) => roles[0]);
