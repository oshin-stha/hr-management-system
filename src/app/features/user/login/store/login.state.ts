import { UserDetails } from 'src/app/shared/models/adduser.model';
import { AuthState } from '../login.model';

export const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
};
export interface UserDetailState {
  userDetails: UserDetails[];
}

export const UserDetailState: UserDetailState = {
  userDetails: [],
};
