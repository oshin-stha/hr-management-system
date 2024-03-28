import { AuthState } from '../../login.model';
import { selectAuthState, isLoggedIn } from './login.selector';

xdescribe('LoginSelector', () => {
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
});
