/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {
  DIRECTIVE_COMPOSITION_API_ROUTE_PREFIX,
  DIRECTIVE_ROUTE_PREFIX,
  getRoutesWithFullPath,
  NAIVE_ROUTE_PREFIX,
} from '@shared/utils/routing.util';
import {adminRoutes} from '@admin-ui/admin.routes';
import {financePortalRoutes} from '../../ui/finance-portal/finance-portal.routes';
import {employeePortalRoutes} from '../../ui/employee-portal/employee-portal.routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  pages$ = of(
    [
      ...getRoutesWithFullPath(adminRoutes, DIRECTIVE_COMPOSITION_API_ROUTE_PREFIX),
      ...getRoutesWithFullPath(financePortalRoutes, DIRECTIVE_ROUTE_PREFIX),
      ...getRoutesWithFullPath(employeePortalRoutes, NAIVE_ROUTE_PREFIX),
    ]
      .filter((x) => !!x?.data)
      .map((route) => ({
        label: route?.data ? route.data['label'] : null,
        url: route?.fullPath,
        position: route?.data ? route.data['position'] : null,
      }))
      .sort((a, b) => a.position - b.position),
  );
}
