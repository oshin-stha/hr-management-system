import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getLeaveStatusReset,
  getLeaveStatusStart,
} from '../../store/leaveStatusState/leaveStatus.action';
import { selectStatus } from '../../store/leaveStatusState/leaveStatus.selector';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  LEAVE_STATUS_CONSTANTS,
  LEAVE_STATUS_TABLE_COLUMNS,
} from 'src/app/shared/constants/leaveDetails.constants';
import { EMAIL, FORMAT_DATE } from 'src/app/shared/constants/email.constant';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export default class LeaveStatusComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  userEmail: string | null = '';
  status: LeaveDetails[] = [];
  displayedColumns: string[] = LEAVE_STATUS_TABLE_COLUMNS;
  getStatusSubscriber: Subscription = new Subscription();
  getErrorSubscriber: Subscription = new Subscription();
  LEAVE_STATUS_CONSTANTS = LEAVE_STATUS_CONSTANTS;
  dataSource = new MatTableDataSource<LeaveDetails>([]);

  constructor(
    private store: Store,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.userEmail = localStorage.getItem(EMAIL);
    this.showLeaveStatus();
  }

  ngOnDestroy(): void {
    this.getStatusSubscriber.unsubscribe();
    this.getErrorSubscriber.unsubscribe();
    this.store.dispatch(getLeaveStatusReset());
  }

  addingDataToDatasource(): void {
    this.dataSource.data = this.status;
  }

  ngAfterViewInit(): void {
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

  getLeaveDetails(): void {
    if (this.userEmail != null) {
      this.store.dispatch(getLeaveStatusStart({ email: this.userEmail }));
    }
  }

  showLeaveStatus(): void {
    this.getStatusSubscriber = this.store
      .select(selectStatus)
      .subscribe((res) => {
        this.status = res;
        this.addingDataToDatasource();
      });
    this.getLeaveDetails();
  }

  formatDate(
    timestamp: { seconds: number; nanoseconds: number } | undefined,
  ): string {
    if (!timestamp) {
      return '-';
    }
    const date = new Date(timestamp.seconds * 1000);
    return this.datePipe.transform(date, FORMAT_DATE) ?? '-';
  }
}
