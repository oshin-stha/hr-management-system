import { Policy } from '../../models/policy.interface';

export interface ViewPolicyState {
  policy: Policy;
  isLoading: boolean;
  error: string;
}

export const initialViewPolicyState: ViewPolicyState = {
  policy: {
    policyType: '',
    policyList: [],
  },
  isLoading: false,
  error: '',
};
