import { ActionReducerMap } from '@ngrx/store';
import { UserState } from './features/admin/add-user/store/add-user.state';
import { LoaderState } from './shared/store/loader-spinner.state';
import { LoaderSpinnerReducer } from './shared/store/loader-spinner.reducer';
import { AddUserReducer } from './features/admin/add-user/store/add-user.reducer';

export interface AppState {
  user: UserState;
  loader: LoaderState;
}
export const appReducer: ActionReducerMap<AppState> = {
  loader: LoaderSpinnerReducer,
  user: AddUserReducer,
};
