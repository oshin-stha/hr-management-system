import { Action, createReducer, on } from '@ngrx/store';
import { LeaveApplicationState } from '../../models/leaveApplicationState.interface';
import { initialState } from './applyLeave.state';
import {
  leaveApplicationFailure,
  leaveApplicationReset,
  leaveApplicationStart,
  leaveApplicationSuccess,
} from './applyLeave.action';

const _leaveApplyReducer = createReducer(
  initialState,
  on(leaveApplicationStart, (state) => ({
    ...state,
    isLeaveApplied: false,
    error: '',
  })),
  on(leaveApplicationSuccess, (state) => ({
    ...state,
    isLeaveApplied: true,
    error: '',
  })),

  on(leaveApplicationFailure, (state, action) => ({
    ...state,
    isLeaveApplied: false,
    error: action.error,
  })),
  on(leaveApplicationReset, () => initialState),
);

export function LeaveApplyReducer(
  state: LeaveApplicationState | undefined,
  action: Action,
) {
  return _leaveApplyReducer(state, action);
}
