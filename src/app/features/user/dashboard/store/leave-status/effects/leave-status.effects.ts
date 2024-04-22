import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getLeaveStatusFail,
  getLeaveStatusSuccess,
  loadLeaveApplicationDetails,
} from '../leave-status.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { LeaveApplicationDetailsService } from '../../../services/leave-application-details/leave-application-details.service';

@Injectable()
export class LeaveStatusEffect {
  constructor(
    private action$: Actions,
    private leaveApplicationDetailsService: LeaveApplicationDetailsService,
  ) {}

  loadLeaveApplicationDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadLeaveApplicationDetails),
      switchMap(() => {
        return this.leaveApplicationDetailsService
          .getCurrentUserLeaveApplicationDetails()
          .pipe(
            map((data) => getLeaveStatusSuccess({ leaveDetails: data })),
            catchError((error) => of(getLeaveStatusFail({ error }))),
          );
      }),
    ),
  );
}
