import { UserDetails } from 'src/app/shared/models/adduser.model';
import { AuthState } from './../../models/login.model';

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
