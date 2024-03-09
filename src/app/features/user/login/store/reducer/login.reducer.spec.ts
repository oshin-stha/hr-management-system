import { loginStart, loginSuccess, loginFailure } from '../login.actions';
import { AuthReducer } from './login.reducer';
import { initialState } from '../login.state';

describe('LoginReducer Testing', () => {
  it('should handle login start', () => {
    const newState = AuthReducer(initialState, loginStart);
    expect(newState.isLoggedIn).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should handle loginSuccess action', () => {
    const newState = AuthReducer(initialState, loginSuccess);
    expect(newState.isLoggedIn).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('should handle loginFailure action', () => {
    const errorMessage = 'Test Error Message';
    const newState = AuthReducer(
      initialState,
      loginFailure({ error: errorMessage }),
    );
    expect(newState.isLoggedIn).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
