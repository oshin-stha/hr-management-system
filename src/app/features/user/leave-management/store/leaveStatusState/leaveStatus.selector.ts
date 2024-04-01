import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveStatusState } from '../../models/leaveStatus.State.interface';

export const LEAVE_STATUS_SELECTOR = 'leave status';
export const selectLeaveStatus = createFeatureSelector<LeaveStatusState>(
  LEAVE_STATUS_SELECTOR,
);

export const selectStatus = createSelector(
  selectLeaveStatus,
  (state) => state.status, // state type return type
);
export const selectError = createSelector(
  selectLeaveStatus,
  (state) => state.error,
);
