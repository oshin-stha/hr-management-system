import {
  AttendanceListState,
  employeeNameState,
} from '../attendance-details.state';
import {
  loadAttendanceDetailsFail,
  loadAttendanceDetailsReset,
  loadAttendanceDetailsSuccess,
  loadEmployeeNameFail,
  loademployeeNameSuccess,
} from '../attendance-details.actions';
import {
  AttendanceListReducer,
  EmployeeNameReducer,
} from './attendance-details.reducer';

describe('AttendanceListReducer', () => {
  const initialState: AttendanceListState = {
    attendanceList: [],
    error: null,
  };

  it('should handle loadAttendanceDetailsSuccess action', () => {
    const attendanceList = [
      {
        email: 'john.doe@example.com',
        checkInTime: new Date(1616673600 * 1000),
        checkOutTime: new Date(1616677200 * 1000),
        checkInStatus: 'Checked-In',
        checkOutStatus: 'Checked-Out',
        checkInReason: 'Reason for check-in',
        checkOutReason: 'Reason for check-out',
        workingHours: 8,
        absent: 'Present',
      },
    ];
    const action = loadAttendanceDetailsSuccess({ attendanceList });
    const state = AttendanceListReducer(initialState, action);

    expect(state.attendanceList).toEqual(attendanceList);
    expect(state.error).toBeNull();
  });

  it('should handle loadAttendanceDetailsReset action', () => {
    const action = loadAttendanceDetailsReset();
    const state = AttendanceListReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle loadAttendanceDetailsFail action', () => {
    const error = 'Sample error';
    const action = loadAttendanceDetailsFail({ error });
    const state = AttendanceListReducer(initialState, action);

    expect(state.error).toEqual(error);
  });
});

describe('EmployeeNameReducer', () => {
  const initialState: employeeNameState = {
    employeeName: '',
    error: null,
  };

  it('should handle loademployeeNameSuccess action', () => {
    const employeeName = 'John Doe';
    const action = loademployeeNameSuccess({ employeeName });
    const state = EmployeeNameReducer(initialState, action);

    expect(state.employeeName).toEqual(employeeName);
    expect(state.error).toBeNull();
  });

  it('should handle loadEmployeeNameFail action', () => {
    const error = 'Sample error';
    const action = loadEmployeeNameFail({ error });
    const state = EmployeeNameReducer(initialState, action);

    expect(state.error).toEqual(error);
  });
});
