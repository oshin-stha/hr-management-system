import { LeaveDetails } from './leaveDetails.interface';

export interface LeaveStatusState {
  status: LeaveDetails[];
  error: string;
}
