import { Action, createReducer, on } from '@ngrx/store';
import {
  loadLeaveDetails,
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetails,
  loadUserDetailsFail,
  loadUserDetailsSuccess,
  resetLeaveDetails,
  resetUserDetails,
} from '../leave-overview.action';
import { LeaveDetailsState, initialState } from '../leave-overview.state';

export const _leaveOverviewReducer = createReducer(
  initialState,

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
  on(resetLeaveDetails, () => initialState),
  on(resetUserDetails, () => initialState),
);

export function SharedLeaveOverviewReducer(
  state: LeaveDetailsState | undefined,
  action: Action,
) {
  return _leaveOverviewReducer(state, action);
}
