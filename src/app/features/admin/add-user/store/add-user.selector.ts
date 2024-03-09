import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './add-user.state';

export const USER_SELECTOR = 'user';
const getUserState = createFeatureSelector<UserState>(USER_SELECTOR);
export const getErrorMessage = createSelector(getUserState, (state) => {
  state.errorMessage;
});
