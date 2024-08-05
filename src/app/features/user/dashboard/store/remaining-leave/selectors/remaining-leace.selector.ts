import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemainingLeaveState } from '../remaining-leave.state';

export const GET_LEAVES_SELECTOR = 'get remaining leaves';

export const selectLeavesStatus =
  createFeatureSelector<RemainingLeaveState>(GET_LEAVES_SELECTOR);

export const selectRemainingLeave = createSelector(
  selectLeavesStatus,
  (state) => state.leaves,
);
export const selectisLoading = createSelector(
  selectLeavesStatus,
  (state) => state.isLoading,
);
export const selectError = createSelector(
  selectLeavesStatus,
  (state) => state.error,
);
