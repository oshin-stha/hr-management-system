import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, map, mergeMap, of } from 'rxjs';
import { SECURE_MODULE_PATH } from 'src/app/shared/constants/routes.constants';
import { LoginService } from '../../login-services/login.service';
import { LoginFormService } from '../../login-form/login-form.service';
import {
  getUserDetails,
  getUserDetailsFailure,
  getUserDetailsSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
} from '../login.actions';
import { UserDetails } from 'src/app/shared/models/adduser.model';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private router: Router,
    private loginFormService: LoginFormService,
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return from(
          this.loginService.logInUser(action.email, action.password),
        ).pipe(
          map(() => {
            localStorage.setItem('Email', action.email);
            this.loginFormService.resetLoginForm();
            return loginSuccess();
          }),
          catchError((error) => {
            const errorMessage = error.code;
            alert(errorMessage);
            return of(loginFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  redirectAfterLogin$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccess),
        map(() => this.navigateToAttendance()),
      ),
    { dispatch: false },
  );

  getUserDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserDetails),
      mergeMap((action) =>
        this.loginService.getUserByEmail(action.email).pipe(
          map((userDetails: UserDetails[]) => {
            localStorage.setItem('role', userDetails[0].role);

            return getUserDetailsSuccess({ userDetails });
          }),
          catchError((error) => of(getUserDetailsFailure({ error }))),
        ),
      ),
    ),
  );

  private navigateToAttendance() {
    this.router.navigate([SECURE_MODULE_PATH]);
  }
}
