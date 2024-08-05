import { AttendanceStateForGettingDataWithTimestamp } from 'src/app/shared/models/attendance.model';
import { UserDetails } from 'src/app/shared/models/user-details.model';

export interface workingHoursState {
  userDetails: UserDetails[];
  attendenceDetails: AttendanceStateForGettingDataWithTimestamp[];
}

export const initialWorkHourState: workingHoursState = {
  userDetails: [],
  attendenceDetails: [],
};
