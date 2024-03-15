export interface AttendanceState {
  email: string | null;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  checkInStatus: string | null;
  checkOutStatus: string | null;
  checkInReason: string | null;
  checkOutReason: string | null;
  workingHours: number | null;
}

export interface AttendanceByDate {
  [date: string]: AttendanceState[];
}

export interface CheckInState {
  checkInStatus: boolean;
  error: unknown;
}
