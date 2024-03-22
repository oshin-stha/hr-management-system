import { Action, createReducer, on } from '@ngrx/store';
import {
  acceptLeaveRequestFail,
  acceptLeaveRequestSuccess,
  rejectLeaveRequestFail,
  rejectLeaveRequestSuccess,
  resetLeaveOverview,
  updateLeaveBalance,
  updateLeaveBalanceFail,
  updateLeaveBalanceSuccess,
} from '../leave-overview.action';
import { LeaveDetailsState, initialState } from '../leave-overview.state';

export const _leaveOverviewReducer = createReducer(
  initialState,
  on(acceptLeaveRequestSuccess, (state, { id }) => ({
    ...state,
    leaveDetails: state.leaveDetails.map((leave) =>
      leave.id === id ? { ...leave, status: 'accepted' } : leave,
    ),
  })),

  on(acceptLeaveRequestFail, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(rejectLeaveRequestSuccess, (state, { id }) => ({
    ...state,
    leaveDetails: state.leaveDetails.map(
      (leave) => (leave.id === id ? { ...leave, status: 'rejected' } : leave), //checks if the id of the current leave matches the id passed in the action payload
    ),
  })),

  on(rejectLeaveRequestFail, (state, { error }) => ({
    ...state,
    error: error,
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

  on(resetLeaveOverview, () => initialState),
);

export function LeaveOverviewReducer(
  state: LeaveDetailsState | undefined,
  action: Action,
) {
  return _leaveOverviewReducer(state, action);
}
