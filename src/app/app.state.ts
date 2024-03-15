import { ActionReducerMap } from '@ngrx/store';
import { UserState } from './features/admin/add-user/store/add-user.state';
import { LoaderState } from './shared/store/loader-spinner.state';
import { LoaderSpinnerReducer } from './shared/store/loader-spinner.reducer';
import { AddUserReducer } from './features/admin/add-user/store/add-user.reducer';
import { AuthReducer } from './features/user/login/store/reducer/login.reducer';
import { AuthState } from './features/user/models/login.model';

export interface AppState {
  user: UserState;
  loader: LoaderState;
  login: AuthState;
}
export const appReducer: ActionReducerMap<AppState> = {
  loader: LoaderSpinnerReducer,
  user: AddUserReducer,
  login: AuthReducer,
};
