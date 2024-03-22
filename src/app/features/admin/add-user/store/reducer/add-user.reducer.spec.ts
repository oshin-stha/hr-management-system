import { Action } from '@ngrx/store';
import { UserDetails, leaveBalance } from 'src/app/shared/models/adduser.model';
import {
  addUserFail,
  addUserStart,
  addleaveBalance,
  addleaveBalanceFail,
  addleaveBalanceSuccess,
  resetUserData,
  signupFail,
  signupStart,
  signupSuccess,
} from '../add-user.action';
import { initialState } from '../add-user.state';
import { AddUserReducer } from './add-user.reducer';

describe('AddUserReducer', () => {
  it('should return the initial state', () => {
    const action = {} as Action;
    const state = AddUserReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle signupStart action', () => {
    const action = signupStart({
      email: 'test@example.com',
      password: 'password',
      employeeId: 'QA1001',
    });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle signupSuccess action', () => {
    const action = signupSuccess();
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it('should handle signupFail action', () => {
    const error = 'Test error';
    const action = signupFail({ error });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle addUserSuccess action', () => {
    const employeeUserDetails: UserDetails = {
      employeeId: 'QA1001',
      firstName: 'Ram',
      middleName: 'Kumar',
      lastName: 'Shrestha',
      gender: 'Male',
      contactNumber: 9812345689,
      address: 'Kathmandu',
      dateOfBirth: new Date('1990-01-01'),
      citizenshipNumber: '12-2323-445',
      startDate: new Date('2022-01-01'),
      department: 'Angular',
      role: 'Developer',
      designation: 'Intern',
      email: 'ram@gmail.com',
    };
    const action = addUserStart({ data: employeeUserDetails });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it('should handle addUserFail action', () => {
    const error = 'Test error';
    const action = addUserFail({ error });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle addleaveBalance action', () => {
    const leaveBalanceData: leaveBalance = {
      sickLeaveTotal: 18,
      annualLeaveTotal: 30,
      specialLeaveTaken: 0,
      sickLeaveRemaining: 18,
      annualLeaveRemaining: 30,
    };

    const action = addleaveBalance({
      email: 'test@example.com',
      leaveBalance: leaveBalanceData,
    });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle addleaveBalanceSuccess action', () => {
    const action = addleaveBalanceSuccess();
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it('should handle addleaveBalanceFail action', () => {
    const error = 'Test error';
    const action = addleaveBalanceFail({ error });
    const state = AddUserReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle resetUserData action', () => {
    const action = resetUserData();
    const state = AddUserReducer(initialState, action);

    expect(state).toBe(initialState);
  });
});
