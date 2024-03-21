import { createAction, props } from '@ngrx/store';
import { AttendanceByDate } from '../../../../shared/models/attendance.model';

export const checkInStart = createAction('[Attendance] Check-in Start');
export const checkInSuccess = createAction('[Attendance] Check-in Success');
export const checkInFailure = createAction(
  '[Attendance] Check-in Failure',
  props<{ error: unknown }>(),
);

export const checkOutStart = createAction(
  '[Attendance] Check-out Start',
  props<{ checkInTime: Date }>(),
);
export const checkOutSuccess = createAction('[Attendance] Check-out Success');
export const checkOutFailure = createAction(
  '[Attendance] Check-out Failure',
  props<{ error: unknown }>(),
);

export const fetchAttendanceData = createAction('[Attendance] Fetch-data');
export const setAttendanceData = createAction(
  '[Attendance] Set-attendance-data',
  props<{ attendanceByDate: AttendanceByDate }>(),
);
