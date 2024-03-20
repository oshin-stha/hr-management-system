import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { getLeaveStatusStart } from '../../store/leaveStatusState/leaveStatus.action';
import {
  selectError,
  selectStatus,
} from '../../store/leaveStatusState/leaveStatus.selector';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = [
    'id',
    'leaveFrom',
    'leaveTo',
    'firstOrSecondHalf',
    'totalLeaveDays',
    'reasonForLeave',
    'leaveType',
    'status',
  ];
  errorMessage: string | undefined;
  getStatusSubscriber: Subscription | undefined;
  getErrorSubscriber: Subscription | undefined;
  dataSource: MatTableDataSource<LeaveDetails> =
    new MatTableDataSource<LeaveDetails>([]);

  constructor(
    private store: Store,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('Email');
    this.getLeaveDetails();
    this.showLeaveStatus();
    this.getErrorMessage();
    this.alertError();
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

  getErrorMessage(): void {
    this.getErrorSubscriber = this.store
      .select(selectError)
      .subscribe((res) => {
        this.errorMessage = res;
      });
  }
  formatDate(
    timestamp: { seconds: number; nanoseconds: number } | undefined,
  ): string {
    if (!timestamp || timestamp.seconds === undefined) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  alertError(): void {
    if (this.errorMessage && this.errorMessage != '') alert(this.errorMessage);
  }

  ngOnDestroy(): void {
    if (this.getStatusSubscriber && this.getErrorSubscriber) {
      this.getStatusSubscriber.unsubscribe();
      this.getErrorSubscriber?.unsubscribe();
    }
  }
}
