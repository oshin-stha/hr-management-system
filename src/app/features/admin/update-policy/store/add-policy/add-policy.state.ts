import { Policy } from '../../models/policy.interface';

export interface AddPolicyState {
  policy: Policy;
  isLoading: boolean;
  error: string;
}

export const initialPolicyState = {
  policy: {},
  isLoading: false,
  error: '',
};
