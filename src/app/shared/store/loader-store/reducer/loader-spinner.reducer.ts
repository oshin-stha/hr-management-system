import { Action, createReducer, on } from '@ngrx/store';
import { setLoadingSpinner } from '../loader-spinner.action';
import { LoaderState, initialState } from '../loader-spinner.state';

const _loaderSpinnerReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, { status }) => ({
    ...state,
    isLoading: status,
  })),
);

export function LoaderSpinnerReducer(
  state: LoaderState | undefined,
  action: Action,
) {
  return _loaderSpinnerReducer(state, action);
}
