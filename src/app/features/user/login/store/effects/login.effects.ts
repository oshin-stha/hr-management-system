import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, map, of } from 'rxjs';
import { SECURE_MODULE_PATH } from 'src/app/shared/constants/routes.constanrs';
import { LoginService } from '../../../services/login-services/login.service';
import { loginFailure, loginStart, loginSuccess } from '../login.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private router: Router,
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

  private navigateToAttendance() {
    this.router.navigate([SECURE_MODULE_PATH]);
  }
}
