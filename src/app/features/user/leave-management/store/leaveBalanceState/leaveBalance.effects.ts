import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getLeavebalanceFailure,
  getLeavebalanceStart,
  getLeavebalanceSuccess,
} from './leaveBalance.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { LeaveBalanceService } from '../../services/leave-balance-service/leave-balance.service';

@Injectable()
export class LeaveBalanceEffects {
  constructor(
    private action: Actions,
    private leaveBalanceService: LeaveBalanceService,
  ) {}

  getLeaveBalance$ = createEffect(() => {
    return this.action.pipe(
      ofType(getLeavebalanceStart),
      switchMap((action) =>
        this.leaveBalanceService.getLeaveBalance(action.email).pipe(
          map((data) => getLeavebalanceSuccess({ leaveBalance: data })),
          catchError((error) =>
            of(getLeavebalanceFailure({ error: error.code })),
          ),
        ),
      ),
    );
  });
}
