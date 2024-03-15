import { UserDetails } from '../../models/adduser.model';
import { leaveDetails } from '../models/leave-overview.model';

export interface LeaveDetailsState {
  leaveDetails: leaveDetails[];
  loading: boolean;
  error: string;
  userDetails: UserDetails[];
}

export const initialState: LeaveDetailsState = {
  leaveDetails: [],
  loading: false,
  userDetails: [],
  error: '',
};
