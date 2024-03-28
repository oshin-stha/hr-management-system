import { AttendanceState } from 'src/app/shared/models/attendance.model';

export const initialStateTodaysAttendance: TodaysAttendanceState[] = [
  {
    attendance: {
      absent: null,
      checkInReason: null,
      checkInStatus: null,
      checkInTime: null,
      checkOutReason: null,
      checkOutStatus: null,
      checkOutTime: null,
      email: null,
      workingHours: null,
    },
    userNameEmployeeID: {
      employeeId: null,
      firstName: null,
      middleName: null,
      lastName: null,
    },
    error: null,
  },
];

export interface TodaysAttendanceState {
  attendance: AttendanceState;
  userNameEmployeeID: NameEmployeeId;
  error?: string | null;
}

export interface NameEmployeeId {
  employeeId: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
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
