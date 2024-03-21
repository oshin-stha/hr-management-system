import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodaysAttendanceState } from '../attendance-overview.state';

export const TODAYS_ATTENDANCE_DATA = 'todays-attendance-data';
export const selectTodaysAttendanceState =
  createFeatureSelector<TodaysAttendanceState>(TODAYS_ATTENDANCE_DATA);

export const selectTodaysAttendance = createSelector(
  selectTodaysAttendanceState,
  (state: TodaysAttendanceState) => state,
);
