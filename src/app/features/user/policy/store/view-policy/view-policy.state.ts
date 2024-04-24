import { Policy } from '../../models/policy.interface';

export interface ViewPolicyState {
  policy: Policy;
  isLoading: boolean;
  error: string;
}

export const initialViewPolicyState = {
  policy: {},
  isLoading: false,
  error: '',
};
