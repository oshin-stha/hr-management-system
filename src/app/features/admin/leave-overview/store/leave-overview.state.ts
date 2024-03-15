import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';

export interface LeaveDetailsState {
  leaveDetails: LeaveDetails[];
  loading: boolean;
  error: string;
}

export const initialState: LeaveDetailsState = {
  leaveDetails: [],
  loading: false,
  error: '',
};
