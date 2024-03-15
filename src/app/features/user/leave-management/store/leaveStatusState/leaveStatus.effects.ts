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

@Injectable()
export class LeaveStausEffects {
  constructor(
    private action: Actions,
    private leaveStatusService: LeaveStatusService,
  ) {}

  getLeaveStatus$ = createEffect(() => {
    return this.action.pipe(
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
}
