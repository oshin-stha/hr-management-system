import { Action, createReducer, on } from '@ngrx/store';
import { CheckInState } from '../../../../../shared/models/attendance.model';
import {
  AttendanceFetchState,
  initialAttendanceFetchState,
  initialStateCheckIn,
} from '../attendance.state';
import {
  checkInFailure,
  checkInStart,
  checkInSuccess,
  checkOutFailure,
  checkOutStart,
  checkOutSuccess,
  fetchAttendanceDataFail,
  fetchAttendanceDataReset,
  fetchAttendanceDataSuccess,
} from '../attendance.actions';

const _AttendanceReducer = createReducer(
  initialStateCheckIn,
  on(checkInStart, (state) => ({
    ...state,
    checkInStatus: false,
    error: null,
  })),
  on(checkInSuccess, (state) => ({
    ...state,
    checkInStatus: true,
    error: null,
  })),
  on(checkInFailure, (state, { error }) => ({
    ...state,
    checkInStatus: false,
    error,
  })),
  on(checkOutStart, (state) => ({
    ...state,
    checkInStatus: true,
    error: null,
  })),
  on(checkOutSuccess, (state) => ({
    ...state,
    checkInStatus: false,
  })),
  on(checkOutFailure, (state, { error }) => ({
    ...state,
    checkInStatus: true,
    error: error,
  })),
);

export function AttendanceReducer(
  state: CheckInState,
  action: Action,
): CheckInState {
  return _AttendanceReducer(state, action);
}

const _AttendanceDataFetchReducer = createReducer(
  initialAttendanceFetchState,
  on(fetchAttendanceDataSuccess, (state, { attendanceList }) => ({
    ...state,
    attendanceList,
  })),
  on(fetchAttendanceDataFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fetchAttendanceDataReset, () => initialAttendanceFetchState),
);

export function AttendanceDataFetchReducer(
  state: AttendanceFetchState,
  action: Action,
): AttendanceFetchState {
  return _AttendanceDataFetchReducer(state, action);
}
