import { createSelector } from "@ngrx/store";
import {selectUserData} from "../auth/auth.selector";

export const selectPermissions = createSelector(
  selectUserData,
  (userData) => userData?.permissions ?? []
);

export const selectHasPermission = (permission: string) =>
  createSelector(selectPermissions, (permissions) =>
    permissions.includes(permission)
  );
