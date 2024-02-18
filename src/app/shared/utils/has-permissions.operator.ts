/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { inject } from '@angular/core';
import { PermissionsService } from '@data/services';
import { Permissions } from '@services/users.service';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

export function hasPermissions<T>(
  permissions: Permissions[],
  permissionsService = inject(PermissionsService),
): MonoTypeOperatorFunction<T> {
  return pipe(
    withLatestFrom(permissionsService.hasPermissions(permissions)),
    filter(([, hasPermissions]) => hasPermissions),
    map(([value]) => value),
  );
}
