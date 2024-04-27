import { createAction, props } from '@ngrx/store';
import { RemainingLeaves } from '../../models/remaining-leave.interface';

export const getRemainingLeaveStart = createAction(
  '[Remaining Leaves] Get Remaining Leaves Start',
);

export const getRemainingLeaveSuccess = createAction(
  '[Remaining Leaves] Get Remaining Leaves Success',
  props<{ leaves: RemainingLeaves }>(),
);

export const getRemainingLeaveFailure = createAction(
  '[Remaining Leaves] Get Remaining Leaves Failure',
  props<{ error: string }>(),
);
