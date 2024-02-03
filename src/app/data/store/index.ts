import {UserState} from './users';
import {authReducer} from '@stores/auth';
import {AuthEffects} from '@stores/auth';
import {errorHandlerFeature} from '@stores/error-handler';
import {ngrxFormsFeature} from '@stores/forms';
import {errorHandlerEffects} from './error-handler';
import {ngrxFormsEffects} from './forms';

export interface AppState {
  users?: UserState;
}

export const AppReducers = {
  auth: authReducer,
  errorHandler: errorHandlerFeature.reducer,
  ngrxForms: ngrxFormsFeature.reducer,
};

export const AppEffects = [AuthEffects, errorHandlerEffects, ngrxFormsEffects];
