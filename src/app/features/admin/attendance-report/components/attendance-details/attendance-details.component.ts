import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ATTENDANCE_REPORT_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import {
  selectAttendanceList,
  selectemployeeName,
} from './attendance-details-store/attendance-details-selector/attendance-details.selector';
import {
  loadAttendanceDetails,
  loademployeeName,
} from './attendance-details-store/attendance-details.actions';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss'],
})
export class AttendanceDetailsComponent implements OnInit, AfterViewInit {
  id: string | null = '';
  attendanceList$: Observable<AttendanceState[]> = new Observable();
  employeeName$: Observable<string | null> = new Observable();
  dataSource: MatTableDataSource<AttendanceState> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.store.dispatch(loademployeeName({ employeeId: this.id }));
      this.employeeName$ = this.store.select(selectemployeeName);

      this.store.dispatch(loadAttendanceDetails({ employeeId: this.id }));
      this.attendanceList$ = this.store.select(selectAttendanceList);
      this.attendanceList$.subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  attendanceOverview() {
    this.router.navigate([`/${SECURE_MODULE_PATH}/${ATTENDANCE_REPORT_PATH}`]);
  }

  displayedColumns: string[] = [
    'index',
    'checkInTime',
    'checkInStatus',
    'checkInReason',
    'checkOutTime',
    'checkOutStatus',
    'checkOutReason',
    'workingHours',
  ];

  formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
}
