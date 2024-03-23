import { Action, createReducer, on } from '@ngrx/store';
import {
  resetTodaysAttendance,
  fetchTodaysAttendnaceDataSuccess,
  fetchTodaysAttendnaceDataFail,
} from '../attendance-overview.actions';
import {
  TodaysAttendanceState,
  initialStateTodaysAttendance,
} from '../attendance-overview.state';

const _TodaysAttendanceDataReducer = createReducer(
  initialStateTodaysAttendance,
  on(fetchTodaysAttendnaceDataSuccess, (state, { todaysAttendance }) => [
    ...state,
    ...todaysAttendance,
  ]),
  on(fetchTodaysAttendnaceDataFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(resetTodaysAttendance, () => initialStateTodaysAttendance),
);

export function TodaysAttendanceReducer(
  state: TodaysAttendanceState[],
  action: Action,
) {
  return _TodaysAttendanceDataReducer(state, action);
}
