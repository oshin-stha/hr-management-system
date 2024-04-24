import { createAction, props } from '@ngrx/store';
import { Policy } from '../../models/policy.interface';

export const addPolicyStart = createAction(
  '[Add Policy] Add Policy Start',
  props<{ policy: Policy }>(),
);

export const addPolicySuccess = createAction('[Add Policy] Add Policy Success');

export const addPolicyFailure = createAction(
  '[Add Policy] Add Policy Failure',
  props<{ error: string }>(),
);
