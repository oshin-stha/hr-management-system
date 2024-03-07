import { AuthState } from '../../../models/login.model';
import { selectAuthState, isLoggedIn, selectError } from './login.selector';

describe('LoginSelector', () => {
  const initialState: AuthState = {
    isLoggedIn: false,
    error: null,
  };

  it('should select isLoggedIn from loginState', () => {
    const authState = selectAuthState.projector(initialState);
    expect(authState).toEqual(initialState);
  });

  it('should select isLoggedIn from auth state', () => {
    const selected = isLoggedIn.projector(initialState);
    expect(selected).toBe(false);
  });

  it('should select error from auth state', () => {
    const selected = selectError.projector(initialState);
    expect(selected).toBe(null);
  });
});
