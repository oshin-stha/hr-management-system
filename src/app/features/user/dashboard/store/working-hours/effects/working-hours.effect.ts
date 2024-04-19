import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AttendenceDetailsService } from '../../../services/attendence-details.service';
import { AttendanceStateForGettingDataWithTimestamp } from 'src/app/shared/models/attendance.model';
import {
  loadAttendenceDetails,
  loadAttendenceDetailsSuccess,
} from '../working-hours.action';
import { loadLeaveDetailsFail } from 'src/app/shared/store/leave-overview-store/leave-overview.action';

@Injectable()
export class WorkingHoursEffect {
  constructor(
    private action$: Actions,
    private attendenceDetailsService: AttendenceDetailsService,
  ) {}

  loadAttendenceDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadAttendenceDetails),
      mergeMap(() =>
        this.attendenceDetailsService.getworkHourDetails().pipe(
          map(
            (
              attendenceDetails: AttendanceStateForGettingDataWithTimestamp[],
            ) => {
              return loadAttendenceDetailsSuccess({ attendenceDetails });
            },
          ),
          catchError((error) => of(loadLeaveDetailsFail({ error }))),
        ),
      ),
    ),
  );
}
