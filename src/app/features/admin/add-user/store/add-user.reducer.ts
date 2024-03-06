import { createReducer, on } from '@ngrx/store';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  loaderSuccess,
  setErrorMessage,
  signupFail,
  signupSuccess,
} from './add-user.action';
import { UserState, initialState } from './add-user.state';
import { Action } from '@ngrx/store';
import { UserDetails } from '../../models/adduser.model';
const _addUserReducer = createReducer(
  initialState,
  on(signupSuccess, (state, action: { email: string; password: string }) => {
    return {
      ...state,
      action: [action.email, action.password],
    };
  }),

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
  on(signupFail, () => initialState),
  on(addUserFail, () => initialState),
);
export function AddUserReducer(state: UserState | undefined, action: Action) {
  return _addUserReducer(state, action);
}
