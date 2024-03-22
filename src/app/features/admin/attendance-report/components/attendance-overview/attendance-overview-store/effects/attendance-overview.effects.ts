import { Injectable } from '@angular/core';
import { AttendanceReportService } from '../../attendance-overview-service/attendance-overview.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchTodaysAttendnaceData,
  fetchTodaysAttendnaceDataFail,
  fetchTodaysAttendnaceDataSuccess,
} from '../attendance-overview.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AttendanceReport {
  constructor(
    private attendanceReportService: AttendanceReportService,
    private actions$: Actions,
  ) {}

  fetchTodaysAttendance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTodaysAttendnaceData),
      switchMap(() => {
        return this.attendanceReportService
          .getTodaysAttendanceWithUserDetails()
          .pipe(
            map((data) =>
              fetchTodaysAttendnaceDataSuccess({ todaysAttendance: data }),
            ),
            catchError((error) => of(fetchTodaysAttendnaceDataFail({ error }))),
          );
      }),
    ),
  );
}
