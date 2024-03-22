import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LeaveOverviewService } from '../../services/leave-overview.service';
import {
  acceptLeaveRequest,
  acceptLeaveRequestFail,
  acceptLeaveRequestSuccess,
  rejectLeaveRequest,
  rejectLeaveRequestFail,
  rejectLeaveRequestSuccess,
  updateLeaveBalance,
  updateLeaveBalanceFail,
  updateLeaveBalanceSuccess,
  updateLeaveStatus,
  updateLeaveStatusFail,
  updateLeaveStatusSuccess,
} from '../leave-overview.action';
@Injectable()
export class LeaveOverviewEffects {
  constructor(
    private actions$: Actions,
    private leaveOverviewService: LeaveOverviewService,
  ) {}

  updateLeaveStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLeaveStatus),
      switchMap(({ id, newStatus }) =>
        this.leaveOverviewService.updateLeaveStatus(id, newStatus).pipe(
          map(() => updateLeaveStatusSuccess({ id, newStatus })),
          catchError((error) => of(updateLeaveStatusFail({ error }))),
        ),
      ),
    ),
  );

  acceptLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptLeaveRequest),
      switchMap(({ id }) =>
        this.leaveOverviewService.acceptLeaveRequest(id).pipe(
          map(() => {
            alert('Leave Accepted');
            return acceptLeaveRequestSuccess({ id });
          }),
          catchError((error) => of(acceptLeaveRequestFail({ error }))),
        ),
      ),
    ),
  );

  rejectLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rejectLeaveRequest),
      switchMap(({ id }) =>
        this.leaveOverviewService.rejectLeaveRequest(id).pipe(
          map(() => {
            alert('Leave Rejected');
            return rejectLeaveRequestSuccess({ id });
          }),
          catchError((error) => of(rejectLeaveRequestFail({ error }))),
        ),
      ),
    ),
  );

  updateLeaveBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLeaveBalance),
      mergeMap(({ email, totalLeaveDays, leaveType }) =>
        this.leaveOverviewService
          .updateLeaveBalance(email, totalLeaveDays, leaveType)
          .pipe(
            map(() => updateLeaveBalanceSuccess()),
            catchError((error) => of(updateLeaveBalanceFail({ error }))),
          ),
      ),
    ),
  );
}
