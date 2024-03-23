import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { LeaveApplicationService } from '../../services/leave-application-service/leave-application.service';
import {
  leaveApplicationFailure,
  leaveApplicationStart,
  leaveApplicationSuccess,
} from './applyLeave.action';
import { Router } from '@angular/router';
import {
  LEAVE_COMPONENT_PATH,
  LEAVE_STATUS_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class LeaveDetailsEffects {
  constructor(
    private action$: Actions,
    private leaveApplicationService: LeaveApplicationService,
    private route: Router,
    private store: Store,
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(leaveApplicationStart),
      switchMap((action) => {
        return from(
          this.leaveApplicationService.addLeaveApplicationDetails(
            action.leaveDetails,
          ),
        ).pipe(
          map(() => {
            return leaveApplicationSuccess();
          }),
          catchError((error) => {
            const errorMessage = error.code;
            alert(errorMessage);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(leaveApplicationFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  navigateToLeaveStatus$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(leaveApplicationSuccess),
        map(() => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          this.route.navigate([
            `${SECURE_MODULE_PATH}/${LEAVE_COMPONENT_PATH}/${LEAVE_STATUS_PATH}`,
          ]);
        }),
      ),
    { dispatch: false },
  );
}
