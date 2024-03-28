import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceDetailsService } from '../../attendance-details-service/attendance-details.service';
import {
  loadAttendanceDetails,
  loadAttendanceDetailsFail,
  loadAttendanceDetailsSuccess,
  loadEmployeeNameFail,
  loademployeeName,
  loademployeeNameSuccess,
} from '../attendance-details.actions';

@Injectable()
export class AttendanceDetails {
  constructor(
    private attendanceDetailsService: AttendanceDetailsService,
    private actions$: Actions,
  ) {}

  loadAttendanceDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAttendanceDetails),
      switchMap((action) =>
        this.attendanceDetailsService
          .getAttendanceDetailsByEmployeeId(action.employeeId)
          .pipe(
            map((attendanceList: AttendanceState[]) => {
              return loadAttendanceDetailsSuccess({ attendanceList });
            }),
            catchError((error) => of(loadAttendanceDetailsFail({ error }))),
          ),
      ),
    ),
  );

  loademployeeName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loademployeeName),
      switchMap((action) =>
        this.attendanceDetailsService
          .getEmployeeNameByEmployeeId(action.employeeId)
          .pipe(
            map((employeeName: string) => {
              if (employeeName) {
                return loademployeeNameSuccess({ employeeName });
              } else {
                const error = 'Empty Employee Name';
                return loadEmployeeNameFail({ error });
              }
            }),
            catchError((error) => of(loadEmployeeNameFail({ error }))),
          ),
      ),
    ),
  );

  navigateToAttendanceOverview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEmployeeNameFail),
        tap(() => {
          this.attendanceDetailsService.attendanceOverviewRoute();
        }),
      ),
    { dispatch: false },
  );
}
