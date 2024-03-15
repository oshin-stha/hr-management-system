import { createAction, props } from '@ngrx/store';
import { UserDetails, leaveBalance } from 'src/app/shared/models/adduser.model';

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
export const addleaveBalance = createAction(
  '[leave balance] addleaveBalance',
  props<{ email: string; leaveBalance: leaveBalance }>(),
);

export const addleaveBalanceSuccess = createAction(
  '[leave balance] addleaveBalance success',
);

export const addleaveBalanceFail = createAction(
  '[leave balance] addleaveBalance fail',
  props<{ error: string }>(),
);

export const loaderSuccess = createAction(
  '[loading] Load loader',
  props<{ status: boolean }>(),
);
