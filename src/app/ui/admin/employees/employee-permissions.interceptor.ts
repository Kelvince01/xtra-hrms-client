/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { hasPermissions } from '@shared/utils/has-permissions.operator';

export const employeePermissionsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  return next(req).pipe(
    hasPermissions([
      'CreateEmployee',
      'DeleteEmployee',
      'EditEmployeeGeneralDetails',
      'ViewEmployees',
    ]),
  );
};
