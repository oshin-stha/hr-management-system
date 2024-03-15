import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './features/user/login/store/reducer/login.reducer';
import { AuthState } from './features/user/models/login.model';

export interface AppState {
  login: AuthState;
}
export const appReducer: ActionReducerMap<AppState> = {
  login: AuthReducer,
};
