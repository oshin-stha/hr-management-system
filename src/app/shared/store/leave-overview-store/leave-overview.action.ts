import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../models/adduser.model';
import { LeaveDetails } from '../../models/leave-overview.model';

export const loadUserDetails = createAction(
  '[User Details] Fetch User Details',
);

export const loadUserDetailsSuccess = createAction(
  '[User Details] Fetch User Details',
  props<{ userDetails: UserDetails[] }>(),
);

export const loadUserDetailsFail = createAction(
  '[User Details] Fetch User Details',
  props<{ error: string }>(),
);
export const loadLeaveDetails = createAction(
  '[LeaveDetails] Load LeaveDetails',
);

export const loadLeaveDetailsSuccess = createAction(
  '[LeaveDetails] Load leaveDetails Success',
  props<{ leaveDetails: LeaveDetails[] }>(),
);

export const loadLeaveDetailsFail = createAction(
  '[LoadDetails] Load leaveDetails Fail',
  props<{ error: string }>(),
);
