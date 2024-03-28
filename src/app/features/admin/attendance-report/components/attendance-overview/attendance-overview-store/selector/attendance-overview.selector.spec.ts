import { TodaysAttendanceState } from '../attendance-overview.state';
import {
  selectTodaysAttendance,
  selectTodaysAttendanceState,
} from './attendance-overview.selector';

const initialState: TodaysAttendanceState = {
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
};

describe('Todays Attendance Selectors', () => {
  describe('selectTodaysAttendanceState', () => {
    it('should select the todays attendance state', () => {
      const mockState = initialState;
      const selectedState = selectTodaysAttendanceState.projector(mockState);
      expect(selectedState).toEqual(initialState);
    });
  });

  describe('selectTodaysAttendance', () => {
    it('should select todays attendance', () => {
      const selectedTodaysAttendance =
        selectTodaysAttendance.projector(initialState);
      expect(selectedTodaysAttendance).toEqual(initialState);
    });
  });
});
