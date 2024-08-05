import { Timestamp } from 'firebase/firestore';

export interface LeaveAppDetails {
  id?: string;
  leaveType: string;
  leaveFrom: Timestamp;
  leaveTo: Timestamp;
  reasonForLeave: string;
  status: string;
  totalLeaveDays: number;
  email: string;
  fromDepartment: string;
}
