import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './features/user/login/store/reducer/login.reducer';
import { AuthState } from './features/user/models/login.model';

// export interface AppState {
//   // user: UserState;
//   // loader: LoaderState;
// }
export const appReducer: ActionReducerMap<AppState> = {
  // loader: LoaderSpinnerReducer,
  // user: AddUserReducer,
  login: AuthReducer,
};
export interface AppState {
  login: AuthState;
}
