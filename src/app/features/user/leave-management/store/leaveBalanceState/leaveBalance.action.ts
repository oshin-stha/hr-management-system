import { createAction, props } from '@ngrx/store';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';

export const getLeavebalanceStart = createAction(
  '[Leave Balance Page] start get leave balance',
  props<{ email: string }>(),
);

export const getLeavebalanceSuccess = createAction(
  '[Leave Balance Page] success get leave balance',
  props<{ leaveBalance: LeaveBalanceDetails }>(),
);

export const getLeavebalanceFailure = createAction(
  '[Leave Balance Page] failure get leave balance',
  props<{ error: string }>(),
);
