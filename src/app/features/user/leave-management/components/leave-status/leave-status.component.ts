import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLeaveStatusStart } from '../../store/leaveStatusState/leaveStatus.action';
import {
  selectError,
  selectStatus,
} from '../../store/leaveStatusState/leaveStatus.selector';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export default class LeaveStatusComponent implements OnInit, OnDestroy {
  userEmail: string | null = '';
  status: LeaveDetails[] = [];
  displayedColumns: string[] = [
    'leaveFrom',
    'leaveTo',
    'totalLeaveDays',
    'reasonForLeave',
    'leaveType',
    'status',
  ];
  errorMessage: string | undefined;
  getStatusSubscriber: Subscription | undefined;
  getErrorSubscriber: Subscription | undefined;

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
      });
  }

  getErrorMessage(): void {
    this.getErrorSubscriber = this.store
      .select(selectError)
      .subscribe((res) => {
        this.errorMessage = res;
        console.log('error');
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
