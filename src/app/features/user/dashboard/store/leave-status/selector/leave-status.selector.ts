import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveStatusState } from '../../../models/leave-status.interface';

export const LEAVE_STATUS_SELECTOR = 'LEAVE_STATUS';

export const selectLeaveStatus = createFeatureSelector<LeaveStatusState>(
  LEAVE_STATUS_SELECTOR,
);

export const selectStatus = createSelector(
  selectLeaveStatus,
  (state) => state.leaveStatus,
);
export const selectError = createSelector(
  selectLeaveStatus,
  (state) => state.error,
);
