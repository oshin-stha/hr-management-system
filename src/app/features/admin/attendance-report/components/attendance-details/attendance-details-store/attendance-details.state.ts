import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const initialStateAttendanceList: AttendanceListState = {
  attendanceList: [],
  error: null,
};

export interface AttendanceListState {
  attendanceList: AttendanceState[];
  error: string | null;
}

export const initialStateemployeeName: employeeNameState = {
  employeeName: '',
  error: null,
};

export interface employeeNameState {
  employeeName: string | null;
  error: string | null;
}
