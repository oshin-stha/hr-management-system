import { Action, createReducer, on } from '@ngrx/store';
import { LeaveStatusState } from '../../models/leaveStatus.State.interface';
import { initialStatusState } from './leaveStatus.state';
import {
  getLeaveStatusFailure,
  getLeaveStatusStart,
  getLeaveStatusSuccess,
} from './leaveStatus.action';

const _leaveStatusreducer = createReducer(
  initialStatusState,
  on(getLeaveStatusStart, (state) => ({
    ...state,
    status: [],
  })),
  on(getLeaveStatusSuccess, (state, action) => ({
    ...state,
    status: action.leaveDetails,
  })),
  on(getLeaveStatusFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
export function LeaveStatusReducer(
  state: LeaveStatusState | undefined,
  action: Action,
) {
  return _leaveStatusreducer(state, action);
}
