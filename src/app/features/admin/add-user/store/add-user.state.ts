import { UserDetails } from 'src/app/shared/models/adduser.model';
export interface UserState {
  user: UserDetails[];
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: [],
  email: '',
  password: '',
  isLoading: false,
  error: '',
};
