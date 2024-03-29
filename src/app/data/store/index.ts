/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {environment} from '../../../environments/environment.development';

export const logger =
  (reducer: any) =>
  (state: any, action: any): any => {
    const currentState = reducer(state, action);
    console.groupCollapsed(`%c ${action.type}`, 'text-transform: uppercase');
    console.log('previous state: ', state);
    console.log('action: ', action);
    console.log('current state: ', currentState);
    console.groupEnd();

    return currentState;
  };

export * from './app.state';
export * from './users';
export * from './users/roles';

export const metaReducers = environment.production ? [] : [logger];
