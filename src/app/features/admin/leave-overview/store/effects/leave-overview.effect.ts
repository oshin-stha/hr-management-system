import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserDetails } from '../../../models/adduser.model';
import { leaveDetails } from '../../models/leave-overview.model';
import { LeaveOverviewService } from '../../services/leave-overview.service';
import {
  acceptLeaveRequest,
  acceptLeaveRequestFail,
  acceptLeaveRequestSuccess,
  loadLeaveDetails,
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetailsSuccess,
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

  loadLeaveDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLeaveDetails),
      mergeMap(() =>
        this.leaveOverviewService.getLeaveDetails().pipe(
          map((leaveDetails: leaveDetails[]) =>
            loadLeaveDetailsSuccess({ leaveDetails }),
          ),
          catchError((error) => of(loadLeaveDetailsFail({ error }))),
        ),
      ),
    ),
  );

  updateLeaveStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLeaveStatus),
      mergeMap(({ id, newStatus }) =>
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
      mergeMap(({ id }) =>
        this.leaveOverviewService.acceptLeaveRequest(id).pipe(
          map(() => acceptLeaveRequestSuccess({ id })),
          catchError((error) => of(acceptLeaveRequestFail({ error }))),
        ),
      ),
    ),
  );

  rejectLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rejectLeaveRequest),
      mergeMap(({ id }) =>
        this.leaveOverviewService.rejectLeaveRequest(id).pipe(
          map(() => rejectLeaveRequestSuccess({ id })),
          catchError((error) => of(rejectLeaveRequestFail({ error }))),
        ),
      ),
    ),
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLeaveDetails),
      mergeMap(() => {
        return this.leaveOverviewService.getUserDetails().pipe(
          map((userDetails: UserDetails[]) =>
            loadUserDetailsSuccess({ userDetails }),
          ),
          catchError((error) => of(loadLeaveDetailsFail({ error }))),
        );
      }),
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
