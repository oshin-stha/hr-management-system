import { Action, createReducer, on } from '@ngrx/store';
import {
  loadAttendanceDetailsFail,
  loadAttendanceDetailsReset,
  loadAttendanceDetailsSuccess,
  loadEmployeeNameFail,
  loademployeeNameSuccess,
} from '../attendance-details.actions';
import {
  AttendanceListState,
  employeeNameState,
  initialStateAttendanceList,
  initialStateemployeeName,
} from '../attendance-details.state';

const _AttendanceListReducer = createReducer(
  initialStateAttendanceList,
  on(loadAttendanceDetailsSuccess, (state, { attendanceList }) => {
    console.log(attendanceList);
    return {
      ...state,
      attendanceList,
      error: null,
    };
  }),
  on(loadAttendanceDetailsReset, () => initialStateAttendanceList),
  on(loadAttendanceDetailsFail, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function AttendanceListReducer(
  state: AttendanceListState,
  action: Action,
) {
  return _AttendanceListReducer(state, action);
}

const _employeeNameReducer = createReducer(
  initialStateemployeeName,
  on(loademployeeNameSuccess, (state, { employeeName }) => ({
    ...state,
    employeeName,
    error: null,
  })),
  on(loadEmployeeNameFail, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function EmployeeNameReducer(state: employeeNameState, action: Action) {
  return _employeeNameReducer(state, action);
}
