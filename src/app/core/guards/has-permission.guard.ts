import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectHasPermission } from "../../data/store/permissions/permission.selector";

export function hasPermissionGuard(permission: string) {
  return function () {
    const store = inject(Store);
    return store.select(selectHasPermission(permission));
  };
}
