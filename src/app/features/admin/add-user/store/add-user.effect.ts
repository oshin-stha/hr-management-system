import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  setErrorMessage,
  signupFail,
  signupStart,
  signupSuccess,
} from './add-user.action';
import { catchError, of, map, from, tap, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AddUserService } from '../../services/add-user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';

@Injectable()
export class AddUserEffect {
  constructor(
    private action$: Actions,
    private addUserService: AddUserService,
    private router: Router,
    private store: Store,
  ) {}

  signup$ = createEffect(
    () =>
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
              return signupSuccess(action);
            }),
            catchError((error) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.addUserService.emailExists = true;

              this.addUserService.getErrorMessage(error.code);
              alert(error.code);
              return of(signupFail());
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  addUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(addUserStart),
        switchMap((action) =>
          of(
            this.addUserService.addUserDetails(
              action.data,
              action.data.employeeId,
            ),
          ).pipe(
            map(() => addUserSuccess({ data: action.data })),
            catchError(() => {
              return of(addUserFail());
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  addUserRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(addUserSuccess),
        tap(() => {
          this.store.dispatch(setErrorMessage({ message: '' }));

          this.router.navigate(['/hrms']);
        }),
      ),
    { dispatch: false },
  );
}
