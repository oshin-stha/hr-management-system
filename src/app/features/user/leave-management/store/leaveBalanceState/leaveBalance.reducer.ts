import { Action, createReducer, on } from '@ngrx/store';
import { initialLeaveBalanceState } from './leaveBalance.state';
import {
  getLeavebalanceFailure,
  getLeavebalanceStart,
  getLeavebalanceSuccess,
} from './leaveBalance.action';
import { LeaveBalanceState } from '../../models/leaveBalanceState.model';

const _leaveBalanceReducer = createReducer(
  initialLeaveBalanceState,
  on(getLeavebalanceStart, (state) => ({
    ...state,
    leaveBalance: {
      totalLeave: 0,
      leaveAvailable: 0,
    },
    error: '',
  })),
  on(getLeavebalanceSuccess, (state, action) => {
    console.log(action.leaveBalance, 'reducer');
    return {
      ...state,
      leaveBalance: action.leaveBalance,
      error: '',
    };
  }),
  on(getLeavebalanceFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
export function LeaveBalanceReducer(
  state: LeaveBalanceState | undefined,
  action: Action,
) {
  return _leaveBalanceReducer(state, action);
}
