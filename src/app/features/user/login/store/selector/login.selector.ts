import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../../models/login.model';

export const LOGIN_SELECTOR = 'login';
export const selectAuthState = createFeatureSelector<AuthState>(LOGIN_SELECTOR);

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.isLoggedIn,
);

export const selectError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);
