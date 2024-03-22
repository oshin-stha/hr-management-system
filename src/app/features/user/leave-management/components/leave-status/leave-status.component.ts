import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { getLeaveStatusStart } from '../../store/leaveStatusState/leaveStatus.action';
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
  TABLE_COLUMNS,
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
  displayedColumns: string[] = TABLE_COLUMNS;
  errorMessage: string | undefined;
  getStatusSubscriber: Subscription | undefined;
  getErrorSubscriber: Subscription | undefined;
  LEAVE_STATUS_CONSTANTS = LEAVE_STATUS_CONSTANTS;
  dataSource: MatTableDataSource<LeaveDetails> =
    new MatTableDataSource<LeaveDetails>([]);

  constructor(
    private store: Store,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem(EMAIL);
    this.getLeaveDetails();
    this.showLeaveStatus();
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
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLeaveDetails(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    if (this.userEmail != null) {
      this.store.dispatch(getLeaveStatusStart({ email: this.userEmail }));
    }
  }

  showLeaveStatus(): void {
    this.getStatusSubscriber = this.store
      .select(selectStatus)
      .subscribe((res) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.status = res;
        this.addingDataToDatasource();
      });
  }

  formatDate(
    timestamp: { seconds: number; nanoseconds: number } | undefined,
  ): string {
    if (!timestamp || timestamp.seconds === undefined) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return this.datePipe.transform(date, FORMAT_DATE) ?? '';
  }

  ngOnDestroy(): void {
    if (this.getStatusSubscriber && this.getErrorSubscriber) {
      this.getStatusSubscriber.unsubscribe();
      this.getErrorSubscriber?.unsubscribe();
    }
  }
}
