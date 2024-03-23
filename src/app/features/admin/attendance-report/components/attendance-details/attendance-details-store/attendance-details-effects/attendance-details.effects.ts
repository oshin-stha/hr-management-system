import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceDetailsService } from '../../attendance-details-service/attendance-details.service';
import {
  loadAttendanceDetails,
  loadEmployeeNameFail,
  loademployeeName,
  loademployeeNameSuccess,
  loadAttendanceDetailsSuccess,
  loadAttendanceDetailsFail,
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
          .getemployeeNameByEmployeeId(action.employeeId)
          .pipe(
            map((employeeName: string) => {
              if (employeeName) {
                return loademployeeNameSuccess({ employeeName });
              } else {
                const error = 'Empty EMployee Name';
                return loadEmployeeNameFail({ error });
              }
            }),
            catchError((error) => of(loadEmployeeNameFail({ error }))),
          ),
      ),
    ),
  );
}
