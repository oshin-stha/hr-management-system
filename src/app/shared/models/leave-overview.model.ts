export interface LeaveDetails {
  id: string;
  sn: string;
  employeeName: string;
  department: string;
  contactInformation: number;
  leaveType: string;
  leaveFrom: Date;
  leaveTo: Date;
  reasonForLeave: string;
  status: string;
  totalLeaveDays: number;
  email: string;
  actionPerformed?: boolean;
  fromDepartment?: string;
}
