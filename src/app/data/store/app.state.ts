import {userReducers, UserState} from './users';
import {errorHandlerFeature} from '@stores/error-handler';
import {ngrxFormsFeature} from '@stores/forms';
import {errorHandlerEffects} from './error-handler';
import {ngrxFormsEffects} from './forms';
import {userEffects} from './users';
import {RoleEffects, roleReducer, RoleState} from './users/roles';

export interface AppState {
  users?: UserState;
  roles?: RoleState;
}

// export const reducers: ActionReducerMap<AppState> = {
export const AppReducers = {
  users: userReducers,
  roles: roleReducer,
  errorHandler: errorHandlerFeature.reducer,
  ngrxForms: ngrxFormsFeature.reducer,
};

export const AppEffects = [errorHandlerEffects, ngrxFormsEffects, userEffects, RoleEffects];
