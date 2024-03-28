import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  getLeaveStatusStart,
  getLeaveStatusSuccess,
  getLeaveStatusFailure,
} from './leaveStatus.action';
import { LeaveStatusService } from '../../services/leave-status-service/leave-status.service';
import { Injectable } from '@angular/core';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class LeaveStausEffects {
  constructor(
    private action$: Actions,
    private leaveStatusService: LeaveStatusService,
  ) {}

  getLeaveStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getLeaveStatusStart),
      switchMap((action) =>
        this.leaveStatusService.getLeaveApplicationData(action.email).pipe(
          map((data) => getLeaveStatusSuccess({ leaveDetails: data })),
          catchError((error) =>
            of(getLeaveStatusFailure({ error: error.code })),
          ),
        ),
      ),
    );
  });

  stopLoadingSpinner$ = createEffect(() =>
    this.action$.pipe(
      ofType(getLeaveStatusSuccess),
      map(() => setLoadingSpinner({ status: false })),
    ),
  );

  showError$ = createEffect(() =>
    this.action$.pipe(
      ofType(getLeaveStatusFailure),
      switchMap((data) => {
        alert(data.error);
        return of(setLoadingSpinner({ status: false }));
      }),
    ),
  );
}
