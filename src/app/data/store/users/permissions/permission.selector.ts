import {createSelector} from '@ngrx/store';
import {selectUser} from '../user.selector';

export const selectPermissions = createSelector(
  selectUser,
  (userData) => userData?.permissions ?? [],
);

export const selectHasPermission = (permission: string) =>
  createSelector(selectPermissions, (permissions) => permissions.includes(permission));
