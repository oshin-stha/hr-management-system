import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  ATTENDANCE_REPORT_DETAILS,
  ATTENDANCE_REPORT_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';
import {
  fetchTodaysAttendnaceData,
  resetTodaysAttendance,
} from './attendance-overview-store/attendance-overview.actions';
import {
  TableDataForTodaysAttendance,
  TodaysAttendanceState,
} from './attendance-overview-store/attendance-overview.state';
import { selectTodaysAttendance } from './attendance-overview-store/selector/attendance-report.selector';

@Component({
  selector: 'app-attendance-overview',
  templateUrl: './attendance-overview.component.html',
  styleUrls: ['./attendance-overview.component.scss'],
})
export class AttendanceOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  todaysAttendanceData$: Observable<TodaysAttendanceState> = new Observable();
  dataSource: MatTableDataSource<TableDataForTodaysAttendance> =
    new MatTableDataSource();
  ATTENDANCE_REPORT_DETAILS = ATTENDANCE_REPORT_DETAILS;
  todaysAttendanceDataSubscrition: Subscription | undefined;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchTodaysAttendnaceData());
    this.todaysAttendanceData$ = this.store.select(selectTodaysAttendance);
    this.formatData();
  }

  resetState() {
    this.store.dispatch(resetTodaysAttendance());
  }

  formatData() {
    this.todaysAttendanceDataSubscrition = this.todaysAttendanceData$.subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          const transformedData: TableDataForTodaysAttendance[] = [];
          data.forEach((entry) => {
            const attendance = entry.attendance;
            const userDetails = entry.userDetails;
            const transformedEntry: TableDataForTodaysAttendance = {
              name: `${userDetails.firstName} ${userDetails.lastName}`,
              checkInTime: attendance.checkInTime
                ? this.formatDate(attendance.checkInTime)
                : null,
              checkInStatus: attendance.checkInStatus,
              checkOutTime: attendance.checkOutTime
                ? this.formatDate(attendance.checkOutTime)
                : null,
              checkOutStatus: attendance.checkOutStatus,
              absent: attendance.absent ? attendance.absent : 'Present',
              workingHours: attendance.workingHours,
              employeeId: userDetails.employeeId,
            };

            transformedData.push(transformedEntry);
          });
          this.dataSource.data = transformedData;
        }
      },
    );
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    'index',
    'name',
    'checkInTime',
    'checkInStatus',
    'checkOutTime',
    'checkOutStatus',
    'absent',
    'workingHours',
    'actions',
  ];

  attendanceDetails(id: string) {
    this.router.navigate([
      `/${SECURE_MODULE_PATH}/${ATTENDANCE_REPORT_PATH}/${ATTENDANCE_REPORT_DETAILS}/${id}`,
    ]);
  }

  formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.todaysAttendanceDataSubscrition?.unsubscribe();
    this.resetState();
  }
}
