import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveDetailsState } from '../leave-overview.state';

export const SHARED_LEAVE_DETAILS = 'SharedleaveDetails';
const getLeaveDetailsState =
  createFeatureSelector<LeaveDetailsState>(SHARED_LEAVE_DETAILS);

export const selectUserDetails = createSelector(
  getLeaveDetailsState,
  (state) => state.userDetails,
);

export const selectUserDetailsLoading = createSelector(
  getLeaveDetailsState,
  (state) => state.loading,
);

export const selectUserDetailsError = createSelector(
  getLeaveDetailsState,
  (state) => state.error,
);
export const getLeaveDetails = createSelector(
  getLeaveDetailsState,
  (state) => state.leaveDetails,
);

export const getLeaveDetailsLoading = createSelector(
  getLeaveDetailsState,
  (state) => state.loading,
);

export const getLeaveDetailsError = createSelector(
  getLeaveDetailsState,
  (state) => state.error,
);
