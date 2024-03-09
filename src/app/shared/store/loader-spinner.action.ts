import { createAction, props } from '@ngrx/store';

export const setLoadingSpinner = createAction(
  '[loader state] set loading spinner',
  props<{ status: boolean }>(),
);
