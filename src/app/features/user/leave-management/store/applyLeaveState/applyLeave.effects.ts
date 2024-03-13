import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, map, of } from 'rxjs';
import { LeaveApplicationService } from '../../services/leave-application-service/leave-application.service';
import {
  leaveApplicationFailure,
  leaveApplicationStart,
  leaveApplicationSuccess,
} from './applyLeave.action';
import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
import { Router } from '@angular/router';
import {
  LEAVE_COMPONENT_PATH,
  LEAVE_STATUS_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';
import { Store } from '@ngrx/store';
// import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';
// import { LEAVE_STATUS_PATH } from 'src/app/shared/constants/routes.constants';

@Injectable()
export class LeaveDetailsEffects {
  constructor(
    private action$: Actions,
    private leaveApplicationService: LeaveApplicationService,
    private leaveApplicationFormService: LeaveFormService,
    private route: Router,
    private store: Store,
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(leaveApplicationStart),
      exhaustMap((action) => {
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
            // this.store.dispatch(setLoadingSpinner({ status: false }))
            return of(leaveApplicationFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  resetAfterApplication$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(leaveApplicationSuccess),
        map(() => {
          // this.store.dispatch(setLoadingSpinner({ status: false }))
          this.leaveApplicationFormService.leaveApplicationForm.reset();
          this.route.navigate([
            `${SECURE_MODULE_PATH}/${LEAVE_COMPONENT_PATH}/${LEAVE_STATUS_PATH}`,
          ]);
        }),
      ),
    { dispatch: false },
  );
}
