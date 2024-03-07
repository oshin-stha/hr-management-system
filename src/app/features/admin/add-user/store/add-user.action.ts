import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../models/adduser.model';

export const signupStart = createAction(
  '[adduser page] signup start',
  props<{ email: string; password: string; employeeId: string }>(),
);

export const signupSuccess = createAction(' [adduser page] signup success');

export const signupFail = createAction('[adduser page] signup fail');

export const addUserStart = createAction(
  '[adduser page] adduser start',
  props<{ data: UserDetails }>(),
);

export const addUserSuccess = createAction(
  '[adduser page] adduser success',
  props<{ redirect: boolean }>(),
);

export const addUserFail = createAction('[adduser page] adduser fail');

export const setErrorMessage = createAction(
  '[adduser page] set error message',
  props<{ message: string }>(),
);

export const loaderSuccess = createAction(
  '[loading] Load loader',
  props<{ status: boolean }>(),
);
