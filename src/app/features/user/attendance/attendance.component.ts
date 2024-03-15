/* eslint-disable @typescript-eslint/no-unused-vars */
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AttendanceByDate } from '../models/attendance.model';
import {
  checkInStart,
  checkOutStart,
  fetchAttendanceData,
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
  checkInStatus: boolean | undefined;
  attendanceByDate$: Observable<AttendanceByDate> = new Observable();
  attendanceData: AttendanceByDate | null = null;
  calendarDate: string | undefined;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchAttendanceData());
    this.attendanceByDate$ = this.store.select(selectAttendanceDataFetchStatus);
    this.getDataForCalendar();
    this.checkInStatusGet();
  }

  checkInStatusGet(): void {
    this.checkInStatusSubscription = this.store
      .select(selectCheckInStatus)
      .subscribe((status) => {
        this.checkInStatus = status;
      });
  }

  getDataForCalendar(): void {
    this.attendanceByDate$.subscribe((data: AttendanceByDate) => {
      if (Object.keys(data).length < 1) {
        return;
      }
      this.attendanceData = data ?? null; //ensure data is not null
    });
  }

  // ngAfterViewChecked(): void {
  //  this.dateClassFunction(new Date(), "month");
  // }

  dateClassFunction: MatCalendarCellClassFunction<Date> = (date: Date) => {
    // const cells = Array.from(document.querySelectorAll<HTMLDivElement>('.mat-calendar-body-cell'));
    // for(let i=0; i < cells.length; i++){
    //   if (this.attendanceData) {
    //     for (const [dateKey, entry] of Object.entries(this.attendanceData)) {
    //       const entryDate = new Date(dateKey);
    //       console.log('outside cell')

    //       if ( date.getDate() === entryDate.getDate() &&
    //         date.getMonth() === entryDate.getMonth() &&
    //         date.getFullYear() === entryDate.getFullYear()) {
    //           console.log('inside cell')
    //           const checkInStatus = entry[0].checkInStatus;
    //           console.log(checkInStatus)
    //           if (checkInStatus === 'Late-Arrival' || checkInStatus === 'Early-Depature') {
    //             cells[i].textContent = checkInStatus;
    //             console.log(cells[i].textContent,"I am the content")
    //           }
    //           break;
    //       }

    //     }
    //     cells[i].textContent = `xxxxxxxx`;
    //   }

    // }

    const classes: MatCalendarCellCssClasses = {};

    if (date.getDay() === 0 || date.getDay() === 6) {
      classes['highlighted'] = true;
    }
    if (this.attendanceData) {
      for (const [dateKey, entry] of Object.entries(this.attendanceData)) {
        // Convert the dateKey string to a Date object
        const entryDate = new Date(dateKey);

        // Check if the date matches the current date being processed
        if (
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
        ) {
          if (entry[0].workingHours) {
            if (entry[0].workingHours < 8.5) {
              classes['lessHour'] = true;
            } else {
              classes['sufficentHour'] = true;
            }
          }
        }
      }
    }
    return classes;
  };

  getCheckInStatus(date: Date): string | null {
    if (this.attendanceData) {
      for (const [dateKey, entry] of Object.entries(this.attendanceData)) {
        const entryDate = new Date(dateKey);
        if (
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
        ) {
          return entry[0].checkInStatus;
        }
      }
    }
    return null; // Indicate no check-in data for this date
  }

  checkIn(): void {
    this.store.dispatch(checkInStart());
  }

  checkOut(): void {
    const checkInTime = new Date();
    this.store.dispatch(checkOutStart({ checkInTime }));
  }

  ngOnDestroy(): void {
    this.checkInStatusSubscription?.unsubscribe();
  }
}
