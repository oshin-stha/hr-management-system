import { Action, createReducer, on } from '@ngrx/store';
import {
  resetTodaysAttendance,
  setTodaysAttendnaceData,
} from '../attendance-overview.actions';
import {
  TodaysAttendanceState,
  initialStateTodaysAttendance,
} from '../attendance-overview.state';

const _TodaysAttendanceDataReducer = createReducer(
  initialStateTodaysAttendance,
  on(setTodaysAttendnaceData, (state, { todaysAttendance }) => [
    ...state,
    ...todaysAttendance,
  ]),
  on(resetTodaysAttendance, () => initialStateTodaysAttendance),
);

export function TodaysAttendanceReducer(
  state: TodaysAttendanceState[],
  action: Action,
) {
  return _TodaysAttendanceDataReducer(state, action);
}
