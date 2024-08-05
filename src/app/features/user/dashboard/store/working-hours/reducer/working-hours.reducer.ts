import { Action, createReducer, on } from '@ngrx/store';
import {
  initialWorkHourState,
  workingHoursState,
} from '../working-hours.state';
import { loadAttendenceDetailsSuccess } from '../working-hours.action';

export const _workHourReducer = createReducer(
  initialWorkHourState,

  on(loadAttendenceDetailsSuccess, (state, { attendenceDetails }) => ({
    ...state,
    attendenceDetails,
  })),
);

export function workHourReducer(
  state: workingHoursState | undefined,
  action: Action,
) {
  return _workHourReducer(state, action);
}
