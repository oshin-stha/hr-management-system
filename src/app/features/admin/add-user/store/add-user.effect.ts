import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { AddUserService } from '../services/add-user/add-user.service';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  addleaveBalance,
  addleaveBalanceFail,
  addleaveBalanceSuccess,
  signupFail,
  signupStart,
  signupSuccess,
} from './add-user.action';
import { SECURE_MODULE_PATH } from 'src/app/shared/constants/routes.constants';
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.addUserService.getErrorMessage(error.code);
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addUserSuccess({ redirect: true });
          }),
          catchError(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
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

  addLeaveBalance$ = createEffect(() =>
    this.action$.pipe(
      ofType(addleaveBalance),
      switchMap((action) =>
        from(
          this.addUserService.addLoadLeaveBalance(
            action.email,
            action.leaveBalance,
          ),
        ).pipe(
          map(() => addleaveBalanceSuccess()),
          catchError((error) => of(addleaveBalanceFail({ error }))),
        ),
      ),
    ),
  );
}
