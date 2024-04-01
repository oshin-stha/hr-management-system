import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LeaveOverviewService } from 'src/app/shared/services/leave-overview.service';
import { UserDetails } from '../../../models/adduser.model';

import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import {
  loadLeaveDetails,
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetailsSuccess,
} from '../leave-overview.action';
@Injectable()
export class SharedLeaveOverviewEffects {
  constructor(
    private actions$: Actions,
    private leaveOverviewService: LeaveOverviewService,
  ) {}
  //naming convention
  loadLeaveDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLeaveDetails),
      mergeMap(() =>
        this.leaveOverviewService.getLeaveDetails().pipe(
          map((leaveDetails: LeaveDetails[]) => {
            return loadLeaveDetailsSuccess({ leaveDetails });
          }),
          catchError((error) => of(loadLeaveDetailsFail({ error }))),
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
}
