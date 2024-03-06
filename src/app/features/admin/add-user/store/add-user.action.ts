import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../models/adduser.model';

export const SIGNUP_START = '[adduser page] signup start';
export const SIGNUP_SUCCESS = '[adduser page] signup success';
export const SIGNUP_FAIL = '[adduser page] signup fail';
export const ADDUSER_START = '[adduser page] adduser start';
export const ADDUSER_SUCCESS = '[adduser page] adduser success';
export const ADDUSER_FAIL = '[adduser page] adduser fail';
export const SET_ERROR_MESSAGE = '[adduser page] set error message';

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string; employeeId: string }>(),
);
export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ email: string; password: string }>(),
);
export const signupFail = createAction(SIGNUP_FAIL);
export const addUserStart = createAction(
  ADDUSER_START,
  props<{ data: UserDetails }>(),
);
export const addUserSuccess = createAction(
  ADDUSER_SUCCESS,
  props<{ data: UserDetails }>(),
);
export const addUserFail = createAction(ADDUSER_FAIL);
export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>(),
);
export const loaderSuccess = createAction(
  '[loading] Load loader',
  props<{ status: boolean }>(),
);
