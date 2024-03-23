import { AuthState } from '../login.model';
import { UserDetails } from 'src/app/shared/models/adduser.model';

export const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
  // userDetails: null,
};
export interface UserDetailState {
  userDetails: UserDetails[];
}

export const UserDetailState: UserDetailState = {
  userDetails: [],
};
