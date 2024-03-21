import { Action, createReducer, on } from '@ngrx/store';
import {
  setAttendanceDetails,
  setemployeeName,
} from '../attendance-details.actions';
import {
  AttendanceListState,
  employeeNameState,
  initialStateAttendanceList,
  initialStateemployeeName,
} from '../attendance-details.state';

const _AttendanceListReducer = createReducer(
  initialStateAttendanceList,
  on(setAttendanceDetails, (state, { attendanceList }) => ({
    ...state,
    attendanceList,
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
  on(setemployeeName, (state, { employeeName }) => ({
    ...state,
    employeeName,
  })),
);

export function EmployeeNameReducer(state: employeeNameState, action: Action) {
  return _employeeNameReducer(state, action);
}
