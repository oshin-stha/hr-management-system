import { Action, createReducer, on } from '@ngrx/store';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  loaderSuccess,
  setErrorMessage,
  signupFail,
  signupStart,
  signupSuccess,
} from './add-user.action';
import { UserState, initialState } from './add-user.state';

const _addUserReducer = createReducer(
  initialState,
  on(signupStart, (state) => {
    return {
      ...state,
    };
  }),

  on(signupSuccess, (state) => {
    return {
      ...state,
    };
  }),

  on(signupFail, () => initialState),

  on(addUserStart, (state) => {
    return {
      ...state,
    };
  }),

  on(addUserSuccess, (state) => {
    return {
      ...state,
    };
  }),

  on(addUserFail, () => initialState),

  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(loaderSuccess, (state, action) => {
    return {
      ...state,
      isLoading: action.status,
    };
  }),
);

export function AddUserReducer(state: UserState | undefined, action: Action) {
  return _addUserReducer(state, action);
}
