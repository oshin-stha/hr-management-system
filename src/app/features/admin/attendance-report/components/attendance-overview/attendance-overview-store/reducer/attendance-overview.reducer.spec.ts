import {
  fetchTodaysAttendnaceDataFail,
  fetchTodaysAttendnaceDataSuccess,
  resetTodaysAttendance,
} from '../attendance-overview.actions';
import { TodaysAttendanceState } from '../attendance-overview.state';
import { TodaysAttendanceReducer } from './attendance-overview.reducer';

describe('TodaysAttendanceReducer', () => {
  const initialState: TodaysAttendanceState[] = [
    {
      attendance: {
        absent: null,
        checkInReason: null,
        checkInStatus: null,
        checkInTime: null,
        checkOutReason: null,
        checkOutStatus: null,
        checkOutTime: null,
        email: null,
        workingHours: null,
      },
      userNameEmployeeID: {
        employeeId: null,
        firstName: null,
        middleName: null,
        lastName: null,
      },
      error: null,
    },
  ];

  it('should add todaysAttendance to state on fetchTodaysAttendnaceDataSuccess', () => {
    const mockData: TodaysAttendanceState[] = [
      {
        attendance: {
          absent: null,
          checkInReason: 'I am late due to traffic',
          checkInStatus: 'Late-Arrival',
          checkInTime: new Date(),
          checkOutReason: '',
          checkOutStatus: 'Checked-Out',
          checkOutTime: new Date(),
          email: 'hr@gmail.com',
          workingHours: 4,
        },
        userNameEmployeeID: {
          employeeId: '123',
          firstName: 'John',
          middleName: '',
          lastName: 'Doe',
        },
      },
    ];
    const action = fetchTodaysAttendnaceDataSuccess({
      todaysAttendance: mockData,
    });
    const state = TodaysAttendanceReducer(initialState, action);
    expect(state).toEqual([...initialState, ...mockData]);
  });

  it('should set error in state on fetchTodaysAttendnaceDataFail', () => {
    const errorMessage = 'Error occurred';
    const action = fetchTodaysAttendnaceDataFail({ error: errorMessage });
    const state = TodaysAttendanceReducer(initialState, action);

    expect(state.length).toEqual(1);

    expect(state[0].error).toEqual(errorMessage);
  });

  it('should reset state to initial state on resetTodaysAttendance', () => {
    const action = resetTodaysAttendance();
    const state = TodaysAttendanceReducer([], action);
    expect(state).toEqual(initialState);
  });
});
