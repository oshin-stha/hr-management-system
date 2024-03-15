import { UserDetails } from '../../models/adduser.model';
import { LeaveDetails } from '../../models/leave-overview.model';

export interface LeaveDetailsState {
  loading: boolean;
  error: string;
  userDetails: UserDetails[];
  leaveDetails: LeaveDetails[];
}

export const initialState: LeaveDetailsState = {
  loading: false,
  userDetails: [],
  leaveDetails: [],
  error: '',
};
