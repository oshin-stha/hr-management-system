import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../login.model';

export const LOGIN_SELECTOR = 'login';
export const selectAuthState = createFeatureSelector<AuthState>(LOGIN_SELECTOR);

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.isLoggedIn,
);
