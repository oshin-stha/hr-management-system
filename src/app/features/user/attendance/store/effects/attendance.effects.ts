import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import {
  AttendanceByDate,
  AttendanceState,
} from '../../../../../shared/models/attendance.model';
import { AttendanceService } from '../../attendance-service/attendance.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import {
  checkInFailure,
  checkInStart,
  checkInSuccess,
  checkOutFailure,
  checkOutStart,
  checkOutSuccess,
  fetchAttendanceData,
  setAttendanceData,
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
        const isLateArrival = currentTime > 550;

        return (isLateArrival ? this.openLateArrivalDialog() : of(null)).pipe(
          switchMap((reason) => {
            if (isLateArrival && !reason) {
              return of(
                checkInFailure({ error: 'No reason provided for being late' }),
              );
            }

            const data: Partial<AttendanceState> = {
              email: email,
              checkInTime: now,
              checkInStatus: isLateArrival ? 'Late-Arrival' : 'Checked-In',
              checkInReason: reason,
              absent: null,
            };

            return this.attendanceService.addCheckIn(data).pipe(
              map(() => checkInSuccess()),
              catchError((error) => of(checkInFailure({ error }))),
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

        return (
          isEarlyDeparture ? this.openEarlyDepartureDialog() : of(null)
        ).pipe(
          switchMap((reason) => {
            if (isEarlyDeparture && !reason) {
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
          this.store.dispatch(fetchAttendanceData());
        }),
      ),
    { dispatch: false },
  );

  private openLateArrivalDialog() {
    return this.dialog.open(DialogComponent).afterClosed();
  }

  private openEarlyDepartureDialog() {
    return this.dialog.open(DialogComponent).afterClosed();
  }

  fetchAttendanceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAttendanceData),
      switchMap(() => {
        const email = localStorage.getItem('Email');
        if (!email) {
          return of(setAttendanceData({ attendanceByDate: {} }));
        }
        return this.attendanceService.getAttendanceData(email).pipe(
          map((attendanceData) => {
            const attendanceByDate: AttendanceByDate = {};
            attendanceData.forEach((entry) => {
              if (entry.checkInTime instanceof Timestamp) {
                const date = entry.checkInTime.toDate().toDateString();
                if (date) {
                  if (!attendanceByDate[date]) {
                    attendanceByDate[date] = [];
                  }
                  attendanceByDate[date].push(entry);
                }
              } else {
                console.error('Invalid checkInTime:', entry.checkInTime);
              }
            });
            return setAttendanceData({ attendanceByDate: attendanceByDate });
          }),
          catchError(() => of({ type: 'error fetching attendance data' })),
        );
      }),
    ),
  );
}
