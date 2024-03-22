import { createAction, props } from '@ngrx/store';

export const setLoadingSpinner = createAction(
  '[Loader State] Set Loading Spinner',
  props<{ status: boolean }>(),
);
