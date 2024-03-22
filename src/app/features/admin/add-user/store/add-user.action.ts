import { createAction, props } from '@ngrx/store';
import { UserDetails, leaveBalance } from 'src/app/shared/models/adduser.model';

export const signupStart = createAction(
  '[Signup] Signup Start',
  props<{ email: string; password: string; employeeId: string }>(),
);

export const signupSuccess = createAction(' [Signup] Signup Success');

export const signupFail = createAction(
  '[Signup] Signup Fail',
  props<{ error: string }>(),
);

export const addUserStart = createAction(
  '[Add User] AddUser Start',
  props<{ data: UserDetails }>(),
);

export const addUserSuccess = createAction(
  '[Add User] AddUser Success',
  props<{ redirect: boolean }>(),
);

export const addUserFail = createAction(
  '[Add User ] AddUser Fail',
  props<{ error: string }>(),
);

export const addleaveBalance = createAction(
  '[Leave Balance] AddLeaveBalance',
  props<{ email: string; leaveBalance: leaveBalance }>(),
);

export const addleaveBalanceSuccess = createAction(
  '[Leave Balance] AddLeaveBalance Success',
);

export const addleaveBalanceFail = createAction(
  '[Leave Balance] AddLeaveBalance Fail',
  props<{ error: string }>(),
);

export const loaderSuccess = createAction(
  '[Loading] Load Loader',
  props<{ status: boolean }>(),
);

export const resetUserData = createAction('[Reset ] Reset User Data');
