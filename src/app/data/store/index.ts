import { UserState } from './users';
import {authReducer} from "./auth/auth.reducer";
import {AuthEffects} from "./auth/auth.effect";
import {errorHandlerFeature} from "./error-handler/error-handler.reducer";
import {ngrxFormsFeature} from "./forms/forms.reducer";
import { errorHandlerEffects } from './error-handler';
import { ngrxFormsEffects } from './forms';

export interface AppState {
  users?: UserState;
}

export const AppReducers = {
  auth: authReducer,
  errorHandler: errorHandlerFeature.reducer,
  ngrxForms: ngrxFormsFeature.reducer,
};

export const AppEffects = [
  AuthEffects,
  errorHandlerEffects,
  ngrxFormsEffects
]
