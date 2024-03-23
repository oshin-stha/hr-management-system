export const LEAVE_APPLY_FORM_CONSTANTS = Object.freeze({
  APPLY_FOR_LEAVE: 'Apply For Leave:',
  FULL_LEAVE_OR_HALF_LEAVE: 'Full/Half Leave',
  FULL_LEAVE: 'Full Leave',
  HAlF_LEAVE: 'Half Leave',
  FROM: 'From',
  TO: 'To',
  DATE_HINT: 'MM/DD/YYYY',
  FIRST_HALF_ORSECOND_HALF: 'First/Second Half',
  SECOND_HALF: 'Second Half',
  FIRST_HALF: 'First Half',
  LEAVE_TYPE: 'Leave Type',
  SICK_LEAVE: 'Sick Leave',
  ANNUAL_LEAVE: 'Annual Leave',
  SPECIAL_LEAVE: 'Special Leave',
  REASON_FOR_LEAVE: 'Reason For Leave',
  MINIMUM_CHARACTERS: 'Minimum 8 characters',
  SUBMIT: 'Submit',
});

export const LEAVE_BALANCE_CONSTANTS = Object.freeze({
  LEAVE_BALANCE: 'Leave Balance:',
  SICK_LEAVE: 'Sick Leave',
  TOTAL_LEAVE: 'Total Leave:',
  DAYS: 'days',
  REMAINING: 'Remaining:',
  ANNUAL_LEAVE: 'Annual Leave',
  SPECIAL_LEAVE: 'Special Leave',
  LEAVE_TAKEN: 'Leave Taken:',
});
export const LEAVE_TREND_CONSTANTS = {
  FOR_FIFTEEN_DAYS: 'Leaves for coming 15 days',
  PICTORIAL_VIEW: 'Pictorial view of total leaves from each department',
};

export const LEAVE_MANAGEMENT_CONSTANTS = {
  LEAVE_BALANCE: 'Leave Balance',
  APPLY_FOR_LEAVE: 'Apply For Leave',
  TRACE_LEAVE: 'Track Leave',
};

export const LEAVE_STATUS_CONSTANTS = Object.freeze({
  TRACK_YOUR_LEAVE: 'Track Your Leave:',
  SEARCH: 'Search',
  SEARCH_ICON: 'search',
  SN: 'S.N.',
  LEAVE_FROM: 'Leave From:',
  LEAVE_TO: 'Leave To:',
  FULL_OR_HALF_DAY: 'Full/Half Day',
  TOTAL_LEAVE_DAYS: 'Leave Duration',
  REASON: 'Reason',
  LEAVE_TYPE: 'Leave Type',
  STATUS: 'Status',
  NO_DATA: ' No data matching',
});
export const TABLE_COLUMNS = [
  'id',
  'leaveFrom',
  'leaveTo',
  'firstOrSecondHalf',
  'totalLeaveDays',
  'reasonForLeave',
  'leaveType',
  'status',
];
export const LEAVE_APPLICATION_DETAILS = 'leaveApplicationDetails';
export const LEAVE_BALANCE = 'leaveBalance';

export const LEAVE_BALANCE_DETAILS = {
  ANNUAL_LEAVE_REMAINING: 'annualLeaveRemaining',
  SICK_LEAVE_REMAINING: 'sickLeaveRemaining',
  SICK_LEAVE_TOTAL: 'sickLeaveTotal',
  ANNUAL_LEAVE_TOTAL: 'annualLeaveTotal',
  SPECIAL_LEAVE_TAKEN: 'specialLeaveTaken',
};
export const IS_EQUAL_TO = '==';
export const USER_EMAIL = 'email';

export const LEAVE_DETAILS = {
  LEAVE_FROM: 'leaveFrom',
  LEAVE_TO: 'leaveTo',
  FIRST_OR_SECOND: 'firstOrSecondHalf',
  TOTAL_LEAVE: 'totalLeaveDays',
  LEAVE_TYPE: 'leaveType',
  REASON: 'reasonForLeave',
  STATUS: 'status',
  DEPARTMENT: 'fromDepartment',
};

export const SHARED_LEAVE_DETAILS = 'SharedleaveDetails';
export const LOADER = 'loader';
export const TOTAL_LEAVES = 'Total Leaves';
export const BAR = 'bar';
export const BAR_CHART = 'barChart';
export const PIE = 'pie';
export const PIE_CHART = 'pieChart';
