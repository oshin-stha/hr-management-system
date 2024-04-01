import { createAction, props } from '@ngrx/store';
import { UserDetails } from 'src/app/shared/models/adduser.model';

export const loginStart = createAction(
  // naming
  '[Auth/API] login start',
  props<{ email: string; password: string }>(),
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string | null }>(),
);

export const loginSuccess = createAction('[Auth/API] login success');
export const getUserDetails = createAction(
  '[User] Get User Details',
  props<{ email: string }>(),
);
export const getUserDetailsSuccess = createAction(
  '[User] Get User Details Success',
  props<{ userDetails: UserDetails[] }>(),
);
export const getUserDetailsFailure = createAction(
  '[User] Get User Details Failure',
  props<{ error: string }>(),
);
