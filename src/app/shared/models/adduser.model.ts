export interface UserDetails {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  contactNumber: number;
  address: string;
  dateOfBirth: Date;
  citizenshipNumber: string;
  startDate: Date;
  department: string;
  role: string;
  designation: string;
  email: string;
}
export interface leaveBalance {
  sickLeaveTotal: number;
  annualLeaveTotal: number;
  specialLeaveTotal: number;
  sickLeaveRemaining: number;
  annualLeaveRemaining: number;
  specialLeaveRemaining: number;
}
export interface ErrorMessage {
  message: string;
}
