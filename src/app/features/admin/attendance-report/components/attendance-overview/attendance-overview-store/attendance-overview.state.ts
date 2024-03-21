import { UserDetails } from 'src/app/shared/models/adduser.model';
import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const initialStateTodaysAttendance: TodaysAttendanceState[] = [];

export interface TodaysAttendanceState {
  attendance: AttendanceState;
  userDetails: UserDetails;
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
