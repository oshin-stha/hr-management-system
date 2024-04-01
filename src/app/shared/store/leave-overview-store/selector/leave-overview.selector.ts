import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveDetailsState } from '../leave-overview.state';

export const SHARED_LEAVE_DETAILS = 'SharedleaveDetails'; //casing
const getLeaveDetailsState =
  createFeatureSelector<LeaveDetailsState>(SHARED_LEAVE_DETAILS);

export const selectUserDetails = createSelector(
  getLeaveDetailsState,
  (state) => state.userDetails,
);

export const getLeaveDetails = createSelector(
  getLeaveDetailsState,
  (state) => state.leaveDetails,
);
