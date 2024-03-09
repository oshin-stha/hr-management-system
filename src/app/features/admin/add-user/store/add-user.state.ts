import { UserDetails } from '../../models/adduser.model';
export interface UserState {
  user: UserDetails[];
  email: string;
  password: string;
  errorMessage: string;
  isLoading: boolean;
  isDuplicate: boolean | undefined;
  addUserError: string;
}

export const initialState: UserState = {
  user: [],
  email: '',
  password: '',
  errorMessage: '',
  isLoading: false,
  isDuplicate: undefined,
  addUserError: '',
};
