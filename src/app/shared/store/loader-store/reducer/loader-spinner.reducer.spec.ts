import { setLoadingSpinner } from '../loader-spinner.action';
import { LoaderState } from '../loader-spinner.state';
import { LoaderSpinnerReducer } from './loader-spinner.reducer';

describe('LoaderSpinnerReducer', () => {
  it('should update isLoading in loader state when setLoadingSpinner action is dispatched', () => {
    const actionPayload = { status: true };
    const action = setLoadingSpinner(actionPayload);

    const prevState: LoaderState = {
      isLoading: false,
      success: false,
      error: '',
    };
    const newState = LoaderSpinnerReducer(prevState, action);
    expect(newState.isLoading).toEqual(actionPayload.status);
    expect(newState.success).toEqual(prevState.success);
    expect(newState.error).toEqual(prevState.error);
  });

  it('should return the same state for unknown action types', () => {
    const prevState: LoaderState = {
      isLoading: false,
      success: false,
      error: '',
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = LoaderSpinnerReducer(prevState, action);
    expect(newState).toEqual(prevState);
  });
});
