import { Timestamp } from 'firebase/firestore';

export interface AttendanceState {
  email: string | null;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  checkInStatus: string | null;
  checkOutStatus: string | null;
  checkInReason: string | null;
  checkOutReason: string | null;
  workingHours: number | null;
  absent: string | null;
}

export interface AttendanceStateForGettingDataWithTimestamp {
  email: string | null;
  checkInTime: Timestamp | null;
  checkOutTime: Timestamp | null;
  checkInStatus: string | null;
  checkOutStatus: string | null;
  checkInReason: string | null;
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
