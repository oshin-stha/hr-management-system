import { Action, createReducer, on } from '@ngrx/store';
import {
  acceptLeaveRequestFail,
  acceptLeaveRequestSuccess,
  loadLeaveDetails,
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetails,
  loadUserDetailsFail,
  loadUserDetailsSuccess,
  rejectLeaveRequestFail,
  rejectLeaveRequestSuccess,
  updateLeaveBalance,
  updateLeaveBalanceFail,
  updateLeaveBalanceSuccess,
} from '../leave-overview.action';
import { LeaveDetailsState, initialState } from '../leave-overview.state';

export const _leaveOverviewReducer = createReducer(
  initialState,
  on(loadLeaveDetails, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadLeaveDetailsSuccess, (state, action) => ({
    ...state,
    leaveDetails: action.leaveDetails,
  })),

  on(loadLeaveDetailsFail, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(acceptLeaveRequestSuccess, (state, { id }) => ({
    ...state,
    leaveDetails: state.leaveDetails.map((leave) =>
      leave.id === id ? { ...leave, status: 'accepted' } : leave,
    ),
  })),

  on(acceptLeaveRequestFail, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(rejectLeaveRequestSuccess, (state, { id }) => ({
    ...state,
    leaveDetails: state.leaveDetails.map((leave) =>
      leave.id === id ? { ...leave, status: 'rejected' } : leave,
    ),
  })),

  on(rejectLeaveRequestFail, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(loadUserDetails, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadUserDetailsSuccess, (state, action) => ({
    ...state,
    userDetails: action.userDetails,
    loading: false,
  })),

  on(loadUserDetailsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateLeaveBalance, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),

  on(updateLeaveBalanceSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(updateLeaveBalanceFail, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);

export function LeaveOverviewReducer(
  state: LeaveDetailsState | undefined,
  action: Action,
) {
  return _leaveOverviewReducer(state, action);
}
