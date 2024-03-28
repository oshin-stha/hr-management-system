import {
  AttendanceState,
  CheckInState,
} from '../../../../shared/models/attendance.model';

export const initialStateCheckIn: CheckInState = {
  checkInStatus: false,
  error: null,
};

export interface AttendanceFetchState {
  attendanceList: AttendanceState[];
}

export const initialAttendanceFetchState: AttendanceFetchState = {
  attendanceList: [
    {
      email: null,
      checkInTime: null,
      checkOutTime: null,
      checkInStatus: null,
      checkOutStatus: null,
      checkInReason: null,
      checkOutReason: null,
      workingHours: null,
      absent: null,
    },
  ],
};
