import { RemainingLeaves } from '../../models/remaining-leave.interface';

export interface RemainingLeaveState {
  leaves: RemainingLeaves;
  isLoading: boolean;
  error: string;
}

export const initialRemainingLeaveState = {
  leaves: {},
  isLoading: false,
  error: '',
};
