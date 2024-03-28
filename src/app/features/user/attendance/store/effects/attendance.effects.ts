import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AttendanceState } from '../../../../../shared/models/attendance.model';
import { AttendanceService } from '../../attendance-service/attendance.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import {
  checkInFailure,
  checkInStart,
  checkInSuccess,
  checkOutFailure,
  checkOutStart,
  checkOutSuccess,
  fetchAttendanceDataFail,
  fetchAttendanceDataStart,
  fetchAttendanceDataSuccess,
} from '../attendance.actions';

@Injectable()
export class AttendanceEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private attendanceService: AttendanceService,
    private store: Store,
  ) {}

  checkIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkInStart),
      switchMap(() => {
        const now = new Date();
        const email = localStorage.getItem('Email');
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const isLateArrival: boolean = currentTime > 550;

        return (isLateArrival ? this.openDialogForm() : of(null)).pipe(
          switchMap((reason) => {
            if (isLateArrival && !reason) {
              alert('No reason provided for being late');
              return of(
                checkInFailure({ error: 'No reason provided for being late' }),
              );
            }

            const data: Partial<AttendanceState> = {
              email: email,
              checkInTime: now,
              checkInStatus: isLateArrival ? 'Late-Arrival' : 'Checked-In',
              checkInReason: reason,
              absent: 'Present',
            };

            return this.attendanceService.addCheckIn(data).pipe(
              map(() => checkInSuccess()),
              catchError((error) => {
                alert(error);
                return of(checkInFailure({ error }));
              }),
            );
          }),
        );
      }),
    ),
  );

  checkOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOutStart),
      switchMap((action) => {
        const now = new Date();
        const email = localStorage.getItem('Email');
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const checkInTime = action.checkInTime;
        const isEarlyDeparture = currentTime < 1070;

        return (isEarlyDeparture ? this.openDialogForm() : of(null)).pipe(
          switchMap((reason) => {
            if (isEarlyDeparture && !reason) {
              alert('No reason provided for early departure');
              return of(
                checkOutFailure({
                  error: 'No reason provided for early departure',
                }),
              );
            }

            const data: Partial<AttendanceState> = {
              email,
              checkOutTime: now,
              checkOutStatus: isEarlyDeparture
                ? 'Early-Departure'
                : 'Checked-Out',
              checkOutReason: reason,
              checkInTime,
            };

            return this.attendanceService.setCheckOut(data).pipe(
              map(() => checkOutSuccess()),
              catchError((error) => of(checkOutFailure({ error }))),
            );
          }),
        );
      }),
    ),
  );

  refetchData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkInSuccess, checkOutSuccess),
        map(() => {
          this.store.dispatch(fetchAttendanceDataStart());
        }),
      ),
    { dispatch: false },
  );

  private openDialogForm() {
    return this.dialog.open(DialogComponent).afterClosed();
  }

  fetchAttendanceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAttendanceDataStart),
      switchMap(() => {
        const email = localStorage.getItem('Email');
        if (!email) {
          return of(
            fetchAttendanceDataFail({ error: 'Your email not found!!' }),
          );
        }
        return this.attendanceService.getAttendanceData(email).pipe(
          map((attendanceData) =>
            fetchAttendanceDataSuccess({ attendanceList: attendanceData }),
          ),
          catchError((error) => of(fetchAttendanceDataFail({ error }))),
        );
      }),
    ),
  );
}
