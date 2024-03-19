import { UserDetails } from 'src/app/shared/models/adduser.model';
export interface UserState {
  user: UserDetails[];
  email: string;
  password: string;
  errorMessage: string;
  isLoading: boolean;
}

export const initialState: UserState = {
  user: [],
  email: '',
  password: '',
  errorMessage: '',
  isLoading: false,
};
