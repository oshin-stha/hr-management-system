import { Timestamp } from 'firebase/firestore';
import {
  acceptLeaveRequestSuccess,
  rejectLeaveRequestSuccess,
  resetLeaveOverview,
} from '../leave-overview.action';
import { LeaveDetailsState, initialState } from '../leave-overview.state';
import { _leaveOverviewReducer } from './leave-overview.reducer';

export interface LeaveDetails {
  id: string;
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
  fromDepartment?: string;
  firstOrSecondHalf?: string;
}

describe('LeaveOverviewReducer', () => {
  const leaveId = '123';
  const sampleLeaveDetails: LeaveDetails = {
    id: leaveId,
    employeeName: 'John Doe',
    department: 'HR',
    contactInformation: 1234567890,
    leaveType: 'Annual',
    leaveFrom: new Timestamp(10, 40),
    leaveTo: new Timestamp(10, 40),
    reasonForLeave: 'Family vacation',
    status: 'pending',
    totalLeaveDays: 5,
    email: 'john.doe@example.com',
  };

  it('should update leave status to accepted', () => {
    const action = acceptLeaveRequestSuccess({ id: leaveId });
    const state: LeaveDetailsState = {
      ...initialState,
      leaveDetails: [sampleLeaveDetails],
    };

    const updatedState = _leaveOverviewReducer(state, action);

    expect(
      updatedState.leaveDetails.find((leave) => leave.id === leaveId)?.status,
    ).toEqual('accepted');
  });

  it('should update leave status to rejected', () => {
    const action = rejectLeaveRequestSuccess({ id: leaveId });
    const state: LeaveDetailsState = {
      ...initialState,
      leaveDetails: [sampleLeaveDetails],
    };

    const updatedState = _leaveOverviewReducer(state, action);

    expect(
      updatedState.leaveDetails.find((leave) => leave.id === leaveId)?.status,
    ).toEqual('rejected');
  });

  it('should reset leave overview state', () => {
    const action = resetLeaveOverview();
    const state: LeaveDetailsState = {
      ...initialState,
      loading: true,
      error: 'Some error',
    };

    const updatedState = _leaveOverviewReducer(state, action);

    expect(updatedState).toEqual(initialState);
  });
});
