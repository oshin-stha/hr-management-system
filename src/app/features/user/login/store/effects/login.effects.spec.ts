import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { LoginService } from '../../login-services/login.service';
import { loginStart, loginSuccess, loginFailure } from '../login.actions';
import { AuthEffects } from './login.effects';
import { initialState } from '../login.state';

describe('LoginEffect testing', () => {
  let actions$: Observable<unknown>;
  let effects: AuthEffects;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', [
      'logInUser',
      'getErrorMessage',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        [provideMockStore({ initialState })],
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should dispatch loginSuccess action on successful login', () => {
    const email = 'test@test.com';
    const password = 'password';
    loginService.logInUser.and.returnValue(of(null));

    actions$ = hot('-a', { a: loginStart({ email, password }) });
    const expected = cold('-b', { b: loginSuccess() });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should dispatch loginFailure action on failed login', () => {
    const email = 'test@test.com';
    const password = 'password';
    const errorMessage = 'Test Error Message';

    loginService.logInUser.and.returnValue(
      cold('#', null, { code: 'Test Error Message' }),
    );

    actions$ = hot('-a', { a: loginStart({ email, password }) });
    const expected = cold('-b', { b: loginFailure({ error: errorMessage }) });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should navigate to attendance after successful login', () => {
    actions$ = of(loginSuccess());
    effects.redirectAfterLogin$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/attendance']);
    });
  });
});
