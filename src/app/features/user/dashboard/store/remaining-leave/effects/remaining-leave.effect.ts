import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GetLeaveBalanceService } from '../../../services/get-leave-balance/get-leave-balance.service';
import {
  getRemainingLeaveFailure,
  getRemainingLeaveStart,
  getRemainingLeaveSuccess,
} from '../remaining-leave.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class RemainingLeaveEffect {
  addPolicy$ = createEffect(() =>
    this.action$.pipe(
      ofType(getRemainingLeaveStart),
      switchMap(() => {
        return this.getLeaveBalanceService
          .getRemainingLeaveBalance(localStorage.getItem('Email'))
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getRemainingLeaveSuccess({ leaves: data });
            }),
            catchError((error) => {
              const errorMessage = error.code;
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return of(getRemainingLeaveFailure({ error: errorMessage }));
            }),
          );
      }),
    ),
  );

  constructor(
    private action$: Actions,
    private store: Store,
    private getLeaveBalanceService: GetLeaveBalanceService,
  ) {}
}
