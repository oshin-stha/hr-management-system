import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddPolicyState } from '../../add-policy.state';

export const ADD_POLICY_SELECTOR = 'add policy';

export const selectPolicyStatus =
  createFeatureSelector<AddPolicyState>(ADD_POLICY_SELECTOR);

export const selectPolicy = createSelector(
  selectPolicyStatus,
  (state) => state.policy,
);
export const selectisLoading = createSelector(
  selectPolicyStatus,
  (state) => state.isLoading,
);
export const selectError = createSelector(
  selectPolicyStatus,
  (state) => state.error,
);
