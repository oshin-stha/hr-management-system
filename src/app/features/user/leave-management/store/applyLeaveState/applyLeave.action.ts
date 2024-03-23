import { createAction, props } from '@ngrx/store';
import { LeaveDetails } from '../../models/leaveDetails.interface';

export const leaveApplicationStart = createAction(
  '[leave application page] start apply for leave',
  props<{ leaveDetails: LeaveDetails }>(),
);

export const leaveApplicationSuccess = createAction(
  '[leave application page] success apply for leave',
);
export const leaveApplicationFailure = createAction(
  '[leave application page] failure apply for leave',
  props<{ error: string }>(),
);
export const leaveApplicationReset = createAction(
  '[leave application page] reset apply for leave',
);
