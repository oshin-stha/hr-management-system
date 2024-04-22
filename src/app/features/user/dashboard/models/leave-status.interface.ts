import { LeaveAppDetails } from './leave-app-details.interface';

export interface LeaveStatusState {
  leaveStatus: LeaveAppDetails[];
  error: string;
}
