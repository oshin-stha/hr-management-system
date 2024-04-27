import { Action, createReducer, on } from '@ngrx/store';
import {
  RemainingLeaveState,
  initialRemainingLeaveState,
} from '../remaining-leave.state';
import {
  getRemainingLeaveStart,
  getRemainingLeaveSuccess,
} from '../remaining-leave.action';

const _getRemainingLeaveReducer = createReducer(
  initialRemainingLeaveState,

  on(getRemainingLeaveStart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getRemainingLeaveSuccess, (state, action) => ({
    ...state,
    leaves: action.leaves,
    isLoading: false,
  })),
);

export function getRemainingLeaveReducer(
  state: RemainingLeaveState | undefined,
  action: Action,
) {
  return _getRemainingLeaveReducer(state, action);
}
