import { Action, createReducer, on } from '@ngrx/store';
import { ViewPolicyState, initialViewPolicyState } from '../view-policy.state';
import { getPolicyStart, getPolicySuccess } from '../../view-policy.action';

const _viewPolicyReducer = createReducer(
  initialViewPolicyState,

  on(getPolicyStart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getPolicySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    policy: action.policy,
  })),
);

export function viewPolicyReducer(
  state: ViewPolicyState | undefined,
  action: Action,
) {
  return _viewPolicyReducer(state, action);
}
