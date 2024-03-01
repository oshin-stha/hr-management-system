import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from '../../src/app/features/user/login/store/login.reducer';
import { AuthState } from './features/user/models/login.model';


export interface AppState {
    login: AuthState; 
}

export const appReducer: ActionReducerMap<AppState>= {
    login: AuthReducer
}