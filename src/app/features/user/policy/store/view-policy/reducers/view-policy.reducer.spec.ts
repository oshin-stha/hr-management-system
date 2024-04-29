import { viewPolicyReducer } from './view-policy.reducer';
import { getPolicyStart, getPolicySuccess } from '../view-policy.action';
import { initialViewPolicyState, ViewPolicyState } from '../view-policy.state';

describe('viewPolicyReducer', () => {
  it('should set isLoading to true on getPolicyStart', () => {
    const initialState: ViewPolicyState = {
      ...initialViewPolicyState,
      isLoading: false,
    };

    const action = getPolicyStart({ selectedPolicy: 'HR Policy' });
    const state = viewPolicyReducer(initialState, action);

    expect(state.isLoading).toBeTrue();
    // Ensure other properties remain unchanged
    expect(state.policy).toEqual(initialState.policy);
    expect(state.error).toEqual(initialState.error);
  });

  it('should set isLoading to false and update policy on getPolicySuccess', () => {
    const initialState: ViewPolicyState = {
      ...initialViewPolicyState,
      isLoading: true,
    };

    const policy = {
      policyType: 'HR Policy',
      policyList: ['HR Policy', 'Company Policy'],
      annualLeave: 20,
      sickLeave: 10,
    };

    const action = getPolicySuccess({ policy });
    const state = viewPolicyReducer(initialState, action);

    expect(state.isLoading).toBeFalse();
    expect(state.policy).toEqual(policy);
    // Ensure other properties remain unchanged
    expect(state.error).toEqual(initialState.error);
  });

  it('should return initial state for unknown action', () => {
    const initialState: ViewPolicyState = {
      ...initialViewPolicyState,
      isLoading: true,
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = viewPolicyReducer(initialState, unknownAction);

    expect(state).toEqual(initialState);
  });
});
