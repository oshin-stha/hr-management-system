import { LeaveBalanceReducer } from './leaveBalance.reducer';
import { initialLeaveBalanceState } from '../leaveBalance.state';
import {
  getLeavebalanceStart,
  getLeavebalanceSuccess,
  getLeavebalanceFailure,
  getLeavebalanceReset,
} from '../leaveBalance.action';
import { LeaveBalanceState } from '../../../models/leaveBalanceState.model';
describe('LeaveBalanceReducer', () => {
  it('should return the initial state', () => {
    const initialState: LeaveBalanceState = initialLeaveBalanceState;
    const action = {} as never;

    const newState = LeaveBalanceReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should handle getLeavebalanceStart action', () => {
    const initialState: LeaveBalanceState = initialLeaveBalanceState;
    const email = 'test@example.com';
    const action = getLeavebalanceStart({ email });

    const newState = LeaveBalanceReducer(initialState, action);

    expect(newState).toEqual({
      leaveBalance: {
        annualLeaveRemaining: 0,
        annualLeaveTotal: 0,
        sickLeaveRemaining: 0,
        sickLeaveTotal: 0,
        specialLeaveTaken: 0,
      },
      error: '',
    });
  });

  it('should handle getLeavebalanceSuccess action', () => {
    const initialState: LeaveBalanceState = initialLeaveBalanceState;
    const mockLeaveBalance = {
      annualLeaveRemaining: 10,
      annualLeaveTotal: 20,
      sickLeaveRemaining: 5,
      sickLeaveTotal: 10,
      specialLeaveTaken: 2,
    };
    const action = getLeavebalanceSuccess({ leaveBalance: mockLeaveBalance });

    const newState = LeaveBalanceReducer(initialState, action);

    expect(newState).toEqual({
      leaveBalance: mockLeaveBalance,
      error: '',
    });
  });

  it('should handle getLeavebalanceFailure action', () => {
    const initialState: LeaveBalanceState = initialLeaveBalanceState;
    const mockError = 'An error occurred';
    const action = getLeavebalanceFailure({ error: mockError });

    const newState = LeaveBalanceReducer(initialState, action);

    expect(newState).toEqual({
      leaveBalance: initialState.leaveBalance,
      error: mockError,
    });
  });

  it('should handle getLeavebalanceReset action', () => {
    const initialState: LeaveBalanceState = {
      leaveBalance: {
        annualLeaveRemaining: 10,
        annualLeaveTotal: 20,
        sickLeaveRemaining: 5,
        sickLeaveTotal: 10,
        specialLeaveTaken: 2,
      },
      error: 'An error occurred',
    };
    const action = getLeavebalanceReset();

    const newState = LeaveBalanceReducer(initialState, action);

    expect(newState).toEqual(initialLeaveBalanceState);
  });
});
