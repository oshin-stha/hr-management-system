import { Injectable } from '@angular/core';
import { AttendanceReportService } from '../../attendance-overview-service/attendance-overview.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchTodaysAttendnaceData,
  setTodaysAttendnaceData,
} from '../attendance-overview.actions';
import { map, switchMap } from 'rxjs';

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
            map((data) => setTodaysAttendnaceData({ todaysAttendance: data })),
          );
      }),
    ),
  );
}
