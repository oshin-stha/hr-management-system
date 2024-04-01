import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../models/adduser.model';
import { LeaveDetails } from '../../models/leave-overview.model';

export const loadUserDetails = createAction(
  '[User Details] Fetch User Details',
);

export const loadUserDetailsSuccess = createAction(
  // naming convention in all
  '[User Details] Fetch User Details Success',
  props<{ userDetails: UserDetails[] }>(),
);

export const loadUserDetailsFail = createAction(
  '[User Details] Fetch User Details Fail',
  props<{ error: string }>(),
);
export const resetUserDetails = createAction(
  '[User Details] Fetch User Details reset',
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

export const resetLeaveDetails = createAction(
  '[LeaveDetails] Load LeaveDetails Reset',
);
