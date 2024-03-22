import { Action, createReducer, on } from '@ngrx/store';
import { initialLeaveBalanceState } from './leaveBalance.state';
import {
  getLeavebalanceFailure,
  getLeavebalanceReset,
  getLeavebalanceStart,
  getLeavebalanceSuccess,
} from './leaveBalance.action';
import { LeaveBalanceState } from '../../models/leaveBalanceState.model';

const _leaveBalanceReducer = createReducer(
  initialLeaveBalanceState,
  on(getLeavebalanceStart, (state) => ({
    ...state,
    leaveBalance: {
      annualLeaveRemaining: 0,
      annualLeaveTotal: 0,
      sickLeaveRemaining: 0,
      sickLeaveTotal: 0,
      specialLeaveTaken: 0,
    },
    error: '',
  })),
  on(getLeavebalanceSuccess, (state, action) => ({
    ...state,
    leaveBalance: action.leaveBalance,
    error: '',
  })),

  on(getLeavebalanceFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(getLeavebalanceReset, () => initialLeaveBalanceState),
);

export function LeaveBalanceReducer(
  state: LeaveBalanceState | undefined,
  action: Action,
) {
  return _leaveBalanceReducer(state, action);
}
