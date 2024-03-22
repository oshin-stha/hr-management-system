import { createAction, props } from '@ngrx/store';
import { AttendanceState } from 'src/app/shared/models/attendance.model';

//Attendance-Details Actions
export const loadAttendanceDetails = createAction(
  '[Attendance Details] Attendance-details-fetch',
  props<{ employeeId: string }>(),
);
export const loadAttendanceDetailsSuccess = createAction(
  '[Attendance Details] Attendance-details-load Success',
  props<{ attendanceList: AttendanceState[] }>(),
);
export const loadAttendanceDetailsFail = createAction(
  '[Attendance Details] Attendance-details-load fail',
  props<{ error: string }>(),
);
export const loadAttendanceDetailsReset = createAction(
  '[Attendance Details] Attendance-details-fetch reset',
);

//Employee-Name Actions
export const loademployeeName = createAction(
  '[Attendance Details] employeeName Load',
  props<{ employeeId: string }>(),
);
export const loademployeeNameSuccess = createAction(
  '[Attendance Details] employeeName Load Success',
  props<{ employeeName: string }>(),
);
export const loadEmployeeNameFail = createAction(
  '[Attendance Details] employeeName Load Fail',
  props<{ error: string }>(),
);
