import { Action, createReducer, on } from '@ngrx/store';
import { LeaveStatusState } from '../../../models/leave-status.interface';
import { initialLeaveStatusState } from '../leave-status.state';
import {
  getLeaveStatusFail,
  getLeaveStatusSuccess,
  loadLeaveApplicationDetails,
} from '../leave-status.action';

const _leaveStatusReducer = createReducer(
  initialLeaveStatusState,
  on(loadLeaveApplicationDetails, (state) => ({
    ...state,
    leaveStatus: [],
  })),
  on(getLeaveStatusSuccess, (state, action) => ({
    ...state,
    leaveStatus: action.leaveDetails,
  })),
  on(getLeaveStatusFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
);

export function LeaveStatusReducer(state: LeaveStatusState, action: Action) {
  return _leaveStatusReducer(state, action);
}
