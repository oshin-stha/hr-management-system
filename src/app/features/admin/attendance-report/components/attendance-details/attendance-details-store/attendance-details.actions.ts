import { createAction, props } from '@ngrx/store';
import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const loadAttendanceDetails = createAction(
  '[Attendance Details] Attendance-details-fetch',
  props<{ employeeId: string }>(),
);

export const setAttendanceDetails = createAction(
  '[Attendance Details] Attendance-details-set',
  props<{ attendanceList: AttendanceState[] }>(),
);

export const loademployeeName = createAction(
  '[Attendance Details] employeeName Load',
  props<{ employeeId: string }>(),
);

export const setemployeeName = createAction(
  '[Attendance Details] employeeName Set',
  props<{ employeeName: string }>(),
);

export const someDefaultAction = createAction('[Default Action]');
