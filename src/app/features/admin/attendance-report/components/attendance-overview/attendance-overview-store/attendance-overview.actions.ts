import { createAction, props } from '@ngrx/store';
import { TodaysAttendanceState } from './attendance-overview.state';

export const fetchTodaysAttendnaceData = createAction(
  '[Attendance Report] Fetch-attendance',
);
export const fetchTodaysAttendnaceDataSuccess = createAction(
  '[Attendance Report] Fetch-attendance Success',
  props<{ todaysAttendance: TodaysAttendanceState[] }>(),
);
export const fetchTodaysAttendnaceDataFail = createAction(
  '[Attendance Report] Fetch-attendance Fail',
  props<{ error: string }>(),
);
export const resetTodaysAttendance = createAction(
  '[Attendance Report] Fetch-attendance Reset',
);
