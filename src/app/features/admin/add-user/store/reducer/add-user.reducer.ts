import { Action, createReducer, on } from '@ngrx/store';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  addleaveBalance,
  addleaveBalanceFail,
  addleaveBalanceSuccess,
  resetUserData,
  signupFail,
  signupStart,
  signupSuccess,
} from '../add-user.action';
import { UserState, initialState } from '../add-user.state';

const _addUserReducer = createReducer(
  initialState,
  on(signupStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(signupSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(signupFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(addUserStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(addUserSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(addUserFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(addleaveBalance, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(addleaveBalanceSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(addleaveBalanceFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(resetUserData, () => initialState),
);

export function AddUserReducer(state: UserState | undefined, action: Action) {
  return _addUserReducer(state, action);
}
