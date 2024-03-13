import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveBalanceState } from '../../models/leaveBalanceState.model';

export const LEAVE_BALANCE_SELECTOR = 'leave balance';
export const selectLeaveBalance = createFeatureSelector<LeaveBalanceState>(
  LEAVE_BALANCE_SELECTOR,
);

export const getLeaveBalance = createSelector(selectLeaveBalance, (state) => {
  console.log(state.leaveBalance, 'selector');
  return state.leaveBalance;
});

export const getError = createSelector(
  selectLeaveBalance,
  (state) => state.error,
);
