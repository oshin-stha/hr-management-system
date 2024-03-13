import { createAction, props } from '@ngrx/store';
import { LeaveDetails } from '../../models/leaveDetails.interface';

export const getLeaveStatusStart = createAction(
  '[Leave Status Page] start get leave status',
  props<{ email: string }>(),
);
export const getLeaveStatusSuccess = createAction(
  '[Leave Status Page] success get leave status',
  props<{ leaveDetails: LeaveDetails[] }>(),
);

export const getLeaveStatusFailure = createAction(
  '[Leave Status Page] failure get leave status',
  props<{ error: string }>(),
);
