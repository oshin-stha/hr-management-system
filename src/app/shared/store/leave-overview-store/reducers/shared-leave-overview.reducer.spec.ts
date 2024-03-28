import { Action } from '@ngrx/store';
import { initialState } from '../shared-leave-overview.state';
import { SharedLeaveOverviewReducer } from './shared-leave-overview.reducers';

import { Timestamp } from 'firebase/firestore';
import { UserDetails } from 'src/app/shared/models/adduser.model';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import {
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetails,
  loadUserDetailsFail,
  loadUserDetailsSuccess,
  resetLeaveDetails,
} from '../shared-leave-overview.action';

describe('SharedLeaveOverviewReducer', () => {
  const userDetails: UserDetails[] = [
    {
      employeeId: 'T1234',
      firstName: 'Test',
      middleName: 'the',
      lastName: 'User',
      gender: 'Male',
      contactNumber: 9812345677,
      address: 'Kathmandu',
      dateOfBirth: new Date('1990-11-12'),
      citizenshipNumber: '123-22-33',
      startDate: new Date('2024-01-01'),
      department: 'Angular',
      role: 'User',
      designation: 'Intern',
      email: 'test@gmail.com',
    },
  ];
  const leaveDetails: LeaveDetails[] = [
    {
      id: 'AN1001',
      employeeName: 'Ram Shrestha',
      department: 'Angular',
      contactInformation: 9812345678,
      leaveType: 'Annual',
      leaveFrom: new Timestamp(4, 20),
      leaveTo: new Timestamp(4, 20),
      reasonForLeave: 'sick',
      status: 'pending',
      totalLeaveDays: 2,
      email: 'ram@gmail.com',
      actionPerformed: true,
      fromDepartment: 'Angular',
      firstOrSecondHalf: 'First Half',
    },
  ];
  const error = {
    message: 'An error occurred',
    code: 'ERROR_CODE',
  };

  it('should return the default state', () => {
    const action = {} as Action;
    const state = SharedLeaveOverviewReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  describe('loadUserDetails', () => {
    it('should set loading to true', () => {
      const action = loadUserDetails();
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.loading).toBeTrue();
    });
  });

  describe('loadUserDetailsSuccess', () => {
    it('should set loading to false and update userDetails', () => {
      const action = loadUserDetailsSuccess({ userDetails });
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.userDetails).toEqual(userDetails);
    });
  });

  describe('loadUserDetailsFail', () => {
    it('should set loading to false and update error', () => {
      const action = loadUserDetailsFail({ error: error.message });
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.error).toEqual(error.message);
    });
  });

  describe('loadLeaveDetailsSuccess', () => {
    it('should set loading to false and update leaveDetails', () => {
      const action = loadLeaveDetailsSuccess({ leaveDetails });
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.leaveDetails).toEqual(leaveDetails);
    });
  });

  describe('loadLeaveDetailsFail', () => {
    it('should set loading to false and update error', () => {
      const action = loadLeaveDetailsFail({ error: error.message });
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.error).toEqual(error.message);
    });
  });

  describe('resetLeaveDetails', () => {
    it('should reset leaveDetails and error to initial state', () => {
      const action = resetLeaveDetails();
      const state = SharedLeaveOverviewReducer(initialState, action);
      expect(state.leaveDetails).toEqual(initialState.leaveDetails);
      expect(state.error).toEqual(initialState.error);
    });
  });
});
