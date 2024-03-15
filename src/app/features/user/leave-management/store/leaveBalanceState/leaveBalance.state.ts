import { LeaveBalanceState } from '../../models/leaveBalanceState.model';

export const initialLeaveBalanceState: LeaveBalanceState = {
  leaveBalance: {
    totalLeave: 0,
    leaveAvailable: 0,
  },
  error: '',
};
