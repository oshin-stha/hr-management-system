import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';
import { AddUserService } from '../../services/add-user/add-user.service';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  signupFail,
  signupStart,
  signupSuccess,
} from './add-user.action';
import { SECURE_MODULE_PATH } from 'src/app/shared/constants/routes.constanrs';
@Injectable()
export class AddUserEffect {
  constructor(
    private action$: Actions,
    private addUserService: AddUserService,
    private router: Router,
    private store: Store,
  ) {}

  signup$ = createEffect(() =>
    this.action$.pipe(
      ofType(signupStart),
      switchMap((action) =>
        from(
          this.addUserService.createAccount(
            action.email,
            action.password,
            action.employeeId,
          ),
        ).pipe(
          map(() => {
            this.addUserService.emailExists = false;
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return signupSuccess();
          }),
          catchError((error) => {
            this.addUserService.emailExists = true;
            this.addUserService.getErrorMessage(error.code);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            alert(error.code);
            return of(signupFail());
          }),
        ),
      ),
    ),
  );

  addUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(addUserStart),
      switchMap((action) =>
        of(
          this.addUserService.addUserDetails(action.data, action.data.email),
        ).pipe(
          map(() => {
            return addUserSuccess({ redirect: true });
          }),
          catchError(() => {
            return of(addUserFail());
          }),
        ),
      ),
    ),
  );

  addUserRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(addUserSuccess),
        map((action) => {
          if (action.redirect) {
            this.router.navigate([SECURE_MODULE_PATH]);
          }
        }),
      ),
    { dispatch: false },
  );
}
