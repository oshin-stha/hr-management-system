export interface AttendanceState {
  // why null
  email: string | null;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  checkInStatus: string | null;
  checkOutStatus: string | null;
  checkInReason: string | null; //differnt null and undefined
  checkOutReason: string | null;
  workingHours: number | null;
  absent: string | null;
}

export interface AttendanceByDate {
  [date: string]: AttendanceState[];
}

export interface CheckInState {
  checkInStatus: boolean;
  error: string | null;
}
