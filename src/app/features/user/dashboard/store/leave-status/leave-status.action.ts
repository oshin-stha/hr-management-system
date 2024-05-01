import { createAction, props } from '@ngrx/store';
import { LeaveAppDetails } from '../../models/leave-app-details.interface';

export const loadLeaveApplicationDetails = createAction(
  '[Leave Application Details] Fetch Application Details',
);

export const getLeaveStatusSuccess = createAction(
  '[Leave Application Details] Fetch Application Details Success',
  props<{ leaveDetails: LeaveAppDetails[] }>(),
);

export const getLeaveStatusFail = createAction(
  '[Leave Application Details] Fetch Application Fail',
  props<{ error: string }>(),
);
