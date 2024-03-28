import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getLeavebalanceFailure,
  getLeavebalanceStart,
  getLeavebalanceSuccess,
} from '../leaveBalance.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { LeaveBalanceService } from '../../../services/leave-balance-service/leave-balance.service';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class LeaveBalanceEffects {
  constructor(
    private action$: Actions,
    private leaveBalanceService: LeaveBalanceService,
  ) {}

  getLeaveBalance$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getLeavebalanceStart),
      switchMap((action) =>
        this.leaveBalanceService.getLeaveBalance(action.email).pipe(
          map((data) => getLeavebalanceSuccess({ leaveBalance: data })),
          catchError((error) => of(getLeavebalanceFailure({ error }))),
        ),
      ),
    );
  });

  stopLoadingSpinner$ = createEffect(() =>
    this.action$.pipe(
      ofType(getLeavebalanceSuccess),
      map(() => setLoadingSpinner({ status: false })),
    ),
  );

  showError$ = createEffect(() =>
    this.action$.pipe(
      ofType(getLeavebalanceFailure),
      switchMap((data) => {
        alert(data.error);
        return of(setLoadingSpinner({ status: false }));
      }),
    ),
  );
}
