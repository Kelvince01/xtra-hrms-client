/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Route, Routes} from '@angular/router';

export type RouteWithFullPath = Route & {fullPath: string};

export const getRoutesWithFullPath = (routes: Routes, prefix: string): RouteWithFullPath[] => {
  return routes.map((route) => ({...route, fullPath: `${prefix}/${route?.path}`}));
};

export const enum NavigationOrder {
  DIRECTIVE_OPEN_EXTERNAL_LINKS = 1,
  DIRECTIVE_PASSWORD_STRENGTH = 2,
  NAIVE_CALENDAR = 3,
  DIRECTIVE_CALENDAR = 4,
  NAIVE_SELECT = 5,
  NAIVE_SELECT_AS_COMPONENT = 6,
  DIRECTIVE_SELECT = 7,
  NAIVE_USER_PERMISSION = 8,
  DIRECTIVE_USER_PERMISSION = 9,
  NAIVE_DISABLE_INTERACTIVE_ELEMENTS = 10,
  DIRECTIVE_DISABLE_INTERACTIVE_ELEMENTS = 11,
  NAIVE_CONTEXT_MENU = 12,
  DIRECTIVE_CONTEXT_MENU = 13,
  DIRECTIVE_COMPOSITION_API_CONTEXT_MENU = 100,
  DIRECTIVE_NG_PLURAL = 200,
}

export const DEFAULT_PAGE = 'directive/password-strength';
export const DIRECTIVE_COMPOSITION_API_ROUTE_PREFIX = 'directive-composition-api';
export const DIRECTIVE_ROUTE_PREFIX = 'directive';
export const NAIVE_ROUTE_PREFIX = 'naive';
