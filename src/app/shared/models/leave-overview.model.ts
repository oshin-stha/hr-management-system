import { Timestamp } from 'firebase/firestore';

export interface LeaveDetails {
  id: string;
  sn: string;
  employeeName: string;
  department: string;
  contactInformation: number;
  leaveType: string;
  leaveFrom: Timestamp;
  leaveTo: Timestamp;
  reasonForLeave: string;
  status: string;
  totalLeaveDays: number;
  email: string;
  actionPerformed?: boolean;
}
