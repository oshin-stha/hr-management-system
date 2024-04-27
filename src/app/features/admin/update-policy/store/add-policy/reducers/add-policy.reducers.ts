import { Action, createReducer, on } from '@ngrx/store';
import { AddPolicyState, initialPolicyState } from '../add-policy.state';
import { addPolicyStart, addPolicySuccess } from '../add-policy.action';

const _addPolicyReducer = createReducer(
  initialPolicyState,

  on(addPolicyStart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(addPolicySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
);

export function addPolicyReducer(
  state: AddPolicyState | undefined,
  action: Action,
) {
  return _addPolicyReducer(state, action);
}
