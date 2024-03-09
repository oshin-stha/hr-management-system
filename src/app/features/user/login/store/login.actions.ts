import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[Auth/API] login start',
  props<{ email: string; password: string }>(),
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string | null }>(),
);

export const loginSuccess = createAction('[Auth/API] login success');
