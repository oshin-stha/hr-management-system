import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { AttendanceState } from '../../../shared/models/attendance.model';
import {
  checkInStart,
  checkOutStart,
  fetchAttendanceDataReset,
  fetchAttendanceDataStart,
} from './store/attendance.actions';
import {
  selectAttendanceDataFetchStatus,
  selectCheckInStatus,
} from './store/selector/attendance.selector';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit, OnDestroy {
  checkInStatusSubscription: Subscription | undefined;
  dataForCalendarSubscription: Subscription | undefined;
  checkInStatus: boolean | undefined;
  attendanceByDate$: Observable<AttendanceState[]> = new Observable();
  attendanceData: AttendanceState[] | null = null;
  calendarDate: string | undefined;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchAttendanceDataStart());
    this.attendanceByDate$ = this.store.select(selectAttendanceDataFetchStatus);
    this.getDataForCalendar();
    this.getCheckInStatus();
  }

  getCheckInStatus(): void {
    this.checkInStatusSubscription = this.store
      .select(selectCheckInStatus)
      .subscribe((status) => {
        this.checkInStatus = status;
      });
  }

  getDataForCalendar(): void {
    this.dataForCalendarSubscription = this.attendanceByDate$.subscribe(
      (data: AttendanceState[]) => {
        if (data.length < 1 || data[0].workingHours == null) {
          return;
        }
        this.attendanceData = data;
      },
    );
  }

  dateClassFunction: MatCalendarCellClassFunction<Date> = (date: Date) => {
    const classes: MatCalendarCellCssClasses = {};

    if (date.getDay() === 0 || date.getDay() === 6) {
      classes['weekends'] = true;
    }

    if (this.attendanceData) {
      this.attendanceData.forEach((attendanceEntry) => {
        if (attendanceEntry.checkInTime instanceof Timestamp) {
          const attendanceDate = attendanceEntry.checkInTime.toDate();
          if (
            date.getDate() === attendanceDate.getDate() &&
            date.getMonth() === attendanceDate.getMonth() &&
            date.getFullYear() === attendanceDate.getFullYear()
          ) {
            if (attendanceEntry.workingHours) {
              if (attendanceEntry.workingHours < 8.5) {
                classes['lessHour'] = true;
              } else {
                classes['sufficientHour'] = true;
              }
            }
          }
        }
      });
    }
    return classes;
  };

  checkIn(): void {
    this.store.dispatch(checkInStart());
  }

  checkOut(): void {
    const checkInTime = new Date();
    this.store.dispatch(checkOutStart({ checkInTime }));
  }

  ngOnDestroy(): void {
    this.checkInStatusSubscription?.unsubscribe();
    this.dataForCalendarSubscription?.unsubscribe();
    this.store.dispatch(fetchAttendanceDataReset());
  }
}
