import { createAction, props } from '@ngrx/store';
import { AttendanceStateForGettingDataWithTimestamp } from 'src/app/shared/models/attendance.model';

export const loadAttendenceDetails = createAction(
  '[Attendence Details] Fetch Attendence Details',
);

export const loadAttendenceDetailsSuccess = createAction(
  '[Attendence Details] Load Attendence Details Success',
  props<{
    attendenceDetails: AttendanceStateForGettingDataWithTimestamp[];
    optionsl?: number;
  }>(),
);

export const loadAttendenceDetailsFail = createAction(
  '[Attendence Details] Load Attendence Details Fail',
  props<{ error: string }>(),
);
