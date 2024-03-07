import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../../models/login.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.isLoggedIn,
);

export const selectError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);
