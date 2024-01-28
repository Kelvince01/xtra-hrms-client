import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectHasPermission} from '@stores/permissions';

export function hasPermissionGuard(permission: string) {
  return function () {
    const store = inject(Store);
    return store.select(selectHasPermission(permission));
  };
}
