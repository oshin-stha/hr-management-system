import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const initialStateTodaysAttendance: TodaysAttendanceState[] = [];

export interface TodaysAttendanceState {
  attendance: AttendanceState;
  userNameEmployeeID: NameEmployeeId;
}

export interface NameEmployeeId {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface TableDataForTodaysAttendance {
  name: string;
  checkInTime: string | null;
  checkInStatus: string | null;
  checkOutTime: string | null;
  checkOutStatus: string | null;
  absent: string | null;
  workingHours: number | null;
  employeeId: string;
}
