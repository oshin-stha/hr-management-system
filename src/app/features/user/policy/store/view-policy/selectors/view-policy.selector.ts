import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewPolicyState } from '../view-policy.state';

export const VIEW_POLICY_SELECTOR = 'view policy';

export const selectViewPolicyStatus =
  createFeatureSelector<ViewPolicyState>(VIEW_POLICY_SELECTOR);

export const selectPolicy = createSelector(
  selectViewPolicyStatus,
  (state) => state.policy,
);

export const selectisLoading = createSelector(
  selectViewPolicyStatus,
  (state) => state.isLoading,
);

export const selectError = createSelector(
  selectViewPolicyStatus,
  (state) => state.error,
);
