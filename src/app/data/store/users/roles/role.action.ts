/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {createAction, props} from '@ngrx/store';
import {IRole} from '@models/accounts.model';

const ACTION_PREFIX = '[Roles]';

export const getRoles = createAction(`${ACTION_PREFIX} Get roles`);

export const getRolesSuccess = createAction(
  `${ACTION_PREFIX} Get roles success`,
  props<{users: Array<IRole>}>(),
);

export const getRolesError = createAction(
  `${ACTION_PREFIX} Get roles error`,
  props<{error: string}>(),
);
