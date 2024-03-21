import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../login.model';
import { initialState } from '../login.state';
import { loginFailure, loginStart, loginSuccess } from '../login.actions';

const _authReducer = createReducer(
  initialState,
  on(loginStart, (state) => ({
    ...state,
    isLoggedIn: false,
    error: null,
  })),

  on(loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    error: null,
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  })),
);

export function AuthReducer(
  state: AuthState = initialState,
  action: Action,
): AuthState {
  return _authReducer(state, action);
}
