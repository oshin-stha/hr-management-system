import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveApplicationState } from '../../models/leaveApplicationState.interface';

export const LEAVE_APPLY_SELECTOR = 'leaveApply';
export const selectLeaveState =
  createFeatureSelector<LeaveApplicationState>(LEAVE_APPLY_SELECTOR);

export const isLeaveApplied = createSelector(
  selectLeaveState,
  (leaveApplication) => leaveApplication.isLeaveApplied,
);

export const selectError = createSelector(
  selectLeaveState,
  (leaveApplication) => leaveApplication.error,
);
