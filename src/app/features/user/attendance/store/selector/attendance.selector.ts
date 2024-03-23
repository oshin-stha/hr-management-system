import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInState } from '../../../../../shared/models/attendance.model';
import { AttendanceFetchState } from '../attendance.state';

export const CHECK_IN_STATE_SELECTOR = 'checkInState';
export const selectCheckInState = createFeatureSelector<CheckInState>(
  CHECK_IN_STATE_SELECTOR,
);

export const selectCheckInStatus = createSelector(
  selectCheckInState,
  (state: CheckInState) => state.checkInStatus,
);

export const ATTENDANCE_DATA_FETCH = 'attendance-data';
export const selectAttendanceDataFetchState =
  createFeatureSelector<AttendanceFetchState>(ATTENDANCE_DATA_FETCH);

export const selectAttendanceDataFetchStatus = createSelector(
  selectAttendanceDataFetchState,
  (state: AttendanceFetchState) => state.attendanceByDate,
);
