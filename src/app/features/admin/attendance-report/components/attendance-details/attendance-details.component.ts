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
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceDetailsService } from './attendance-details-service/attendance-details.service';
import {
  selectAttendanceList,
  selectemployeeName,
} from './attendance-details-store/attendance-details-selector/attendance-details.selector';
import {
  loadAttendanceDetails,
  loadAttendanceDetailsReset,
  loademployeeName,
} from './attendance-details-store/attendance-details.actions';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss'],
})
export class AttendanceDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  id: string | null = null;
  employeeName$: Observable<string | null> = new Observable();
  dataSource: MatTableDataSource<AttendanceState> = new MatTableDataSource();
  attendanceListSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private attendanceDetailsService: AttendanceDetailsService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.initializeData(this.id);
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  initializeData(id: string): void {
    this.employeeName$ = this.store.select(selectemployeeName);
    this.attendanceListSubscription = this.store
      .select(selectAttendanceList)
      .subscribe((data) => {
        this.dataSource.data = data;
      });

    this.store.dispatch(loademployeeName({ employeeId: id }));
    this.store.dispatch(loadAttendanceDetails({ employeeId: id }));
  }

  attendanceOverview(): void {
    this.attendanceDetailsService.attendanceOverviewRoute();
  }

  formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.attendanceListSubscription?.unsubscribe();
    this.store.dispatch(loadAttendanceDetailsReset());
  }
}
