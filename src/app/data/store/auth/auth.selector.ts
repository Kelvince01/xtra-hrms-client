import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from "./auth.state";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectError = createSelector(
  authFeature,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  authFeature,
  (state) => state.isLoading
);

export const selectToken = createSelector(
  authFeature,
  (state) => state.token,
);
export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.token
);
export const selectUserData = createSelector(
  authFeature,
  (state) => state.user
);
