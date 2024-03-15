import { AttendanceByDate, CheckInState } from '../../models/attendance.model';

export const initialStateCheckIn: CheckInState = {
  checkInStatus: false,
  error: null,
};

export interface AttendanceFetchState {
  attendanceByDate: AttendanceByDate;
}

export const initialAttendanceFetchState: AttendanceFetchState = {
  attendanceByDate: {},
};
