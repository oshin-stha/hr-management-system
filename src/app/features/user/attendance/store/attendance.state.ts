import {
  AttendanceByDate,
  CheckInState,
} from '../../../../shared/models/attendance.model';

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
