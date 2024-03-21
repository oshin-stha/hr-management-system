import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const initialStateAttendanceList: AttendanceListState = {
  attendanceList: [],
};

export interface AttendanceListState {
  attendanceList: AttendanceState[];
}

export const initialStateemployeeName: employeeNameState = {
  employeeName: '',
};

export interface employeeNameState {
  employeeName: string | null;
}
