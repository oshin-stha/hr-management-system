import { createAction, props } from '@ngrx/store';
import { AttendanceState } from '../../../../shared/models/attendance.model';
export const checkInStart = createAction('[Attendance] Check-in Start');
export const checkInSuccess = createAction('[Attendance] Check-in Success');
export const checkInFailure = createAction(
  '[Attendance] Check-in Failure',
  props<{ error: string }>(),
);

export const checkOutStart = createAction(
  '[Attendance] Check-out Start',
  props<{ checkInTime: Date }>(),
);
export const checkOutSuccess = createAction('[Attendance] Check-out Success');
export const checkOutFailure = createAction(
  '[Attendance] Check-out Failure',
  props<{ error: string }>(),
);

export const fetchAttendanceDataStart = createAction(
  '[Attendance] Fetch-attendance',
);
export const fetchAttendanceDataSuccess = createAction(
  '[Attendance] Fetch-attendance Success',
  props<{ attendanceList: AttendanceState[] }>(),
);
export const fetchAttendanceDataFail = createAction(
  '[Attendance] Fetch-attendance Fail',
  props<{ error: string }>(),
);
export const fetchAttendanceDataReset = createAction(
  '[Attendance] Fetch-attendance Fail',
);
