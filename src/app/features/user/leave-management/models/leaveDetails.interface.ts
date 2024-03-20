export interface LeaveDetails {
  email: string;
  leaveFrom: Date;
  leaveTo: Date;
  firstOrSecondHalf: string;
  totalLeaveDays: number;
  leaveType: string;
  reasonForLeave: string;
  status: string;
  fromDepartment: string;
}
