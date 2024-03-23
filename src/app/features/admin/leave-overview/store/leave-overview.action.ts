import { createAction, props } from '@ngrx/store';

export const updateLeaveStatus = createAction(
  '[Leave Overview] Update Leave Status',
  props<{ id: string; newStatus: string }>(),
);

export const updateLeaveStatusSuccess = createAction(
  '[Leave Overview] Update Leave Status Success',
  props<{ id: string; newStatus: string }>(),
);

export const updateLeaveStatusFail = createAction(
  '[Leave Overview] Update Leave Status Fail',
  props<{ error: string }>(),
);
export const acceptLeaveRequest = createAction(
  '[Leave Overview] Accept Leave Request',
  props<{ id: string }>(),
);

export const acceptLeaveRequestSuccess = createAction(
  '[Leave Overview] Accept Leave Request Success',
  props<{ id: string }>(),
);

export const acceptLeaveRequestFail = createAction(
  '[Leave Overview] Accept Leave Request Fail',
  props<{ error: string }>(),
);

export const rejectLeaveRequest = createAction(
  '[Leave Overview] Reject Leave Request',
  props<{ id: string }>(),
);

export const rejectLeaveRequestSuccess = createAction(
  '[Leave Overview] Reject Leave Request Success',
  props<{ id: string }>(),
);

export const rejectLeaveRequestFail = createAction(
  '[Leave Overview] Reject Leave Request Fail',
  props<{ error: string }>(),
);

export const updateLeaveBalance = createAction(
  '[Leave Balance] Update Leave Balance',
  props<{ email: string; totalLeaveDays: number; leaveType: string }>(),
);

export const updateLeaveBalanceSuccess = createAction(
  '[Leave Balance] Update Leave Balance',
);

export const updateLeaveBalanceFail = createAction(
  '[Leave Balance] Update Leave Balance',
  props<{ error: string }>(),
);

export const resetLeaveOverview = createAction(
  '[Reset LeaveOverview] Reset Leave Overview',
);
