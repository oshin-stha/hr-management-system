import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AttendanceListState,
  employeeNameState,
} from '../attendance-details.state';

export const ATTENDANCE_LIST = 'attendance-list-individualr';
export const selectAttendanceListState =
  createFeatureSelector<AttendanceListState>(ATTENDANCE_LIST);

export const selectAttendanceList = createSelector(
  selectAttendanceListState,
  (state: AttendanceListState) => {
    console.log(state);
    return state.attendanceList;
  },
);

export const USER_NAME = 'attendance-details-individual';
export const selectemployeeNameState =
  createFeatureSelector<employeeNameState>(USER_NAME);

export const selectemployeeName = createSelector(
  selectemployeeNameState,
  (state: employeeNameState) => state.employeeName,
);
