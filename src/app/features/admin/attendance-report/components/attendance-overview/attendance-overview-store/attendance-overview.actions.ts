import { createAction, props } from '@ngrx/store';
import { TodaysAttendanceState } from './attendance-overview.state';

export const fetchTodaysAttendnaceData = createAction(
  '[Attendance Report] fetch attendance',
);
export const setTodaysAttendnaceData = createAction(
  '[Attendance Report] set attendance',
  props<{ todaysAttendance: TodaysAttendanceState[] }>(),
);

export const resetTodaysAttendance = createAction(
  '[Attendance Report] reset attendance',
);
