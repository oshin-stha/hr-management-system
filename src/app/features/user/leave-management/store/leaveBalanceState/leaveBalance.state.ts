import { LeaveBalanceState } from '../../models/leaveBalanceState.model';

export const initialLeaveBalanceState: LeaveBalanceState = {
  leaveBalance: {
    annualLeaveRemaining: 0,
    annualLeaveTotal: 0,
    sickLeaveRemaining: 0,
    sickLeaveTotal: 0,
    specialLeaveTaken: 0,
  },
  error: '',
};
