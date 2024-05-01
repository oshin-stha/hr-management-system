import { createAction, props } from '@ngrx/store';
import { Policy } from '../../models/policy.interface';

export const getPolicyStart = createAction(
  '[Get Policy] Get Policy Start ',
  props<{ selectedPolicy: string }>(),
);

export const getPolicySuccess = createAction(
  '[Get Policy] Get Policy Success',
  props<{ policy: Policy }>(),
);

export const getPolicyFailure = createAction(
  '[Get Policy] Get Policy Failure',
  props<{ error: string }>(),
);
