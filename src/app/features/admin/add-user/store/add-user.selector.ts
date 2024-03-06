import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './add-user.state';

export const USER_STATE_NAME = 'user';
const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);
export const getErrorMessage = createSelector(getUserState, (state) => {
  state.errorMessage;
});
