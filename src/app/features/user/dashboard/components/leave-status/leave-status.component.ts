import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadLeaveApplicationDetails } from '../../store/leave-status/leave-status.action';
import { selectStatus } from '../../store/leave-status/selector/leave-status.selector';
import { LeaveAppDetails } from '../../models/leave-app-details.interface';
import { DASHBOARD_LEAVE_COLUMNS } from 'src/app/shared/constants/dashboard-leave-details.constants';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export class LeaveStatusComponent implements OnInit, OnDestroy {
  leaveAppDetails: LeaveAppDetails[] = [];
  dataSource = new MatTableDataSource<LeaveAppDetails>([]);
  displayedColumns: string[] = DASHBOARD_LEAVE_COLUMNS;
  selectStatusSubscriber: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadLeaveDetails();
  }

  ngOnDestroy(): void {
    this.selectStatusSubscriber.unsubscribe();
  }

  loadLeaveDetails(): void {
    this.selectStatusSubscriber = this.store
      .select(selectStatus)
      .subscribe((res) => {
        this.leaveAppDetails = res;
        this.dataSource.data = this.leaveAppDetails;
      });
    this.store.dispatch(loadLeaveApplicationDetails());
  }

  formatTimestamp(timestamp: Timestamp): string {
    return timestamp.toDate().toLocaleDateString();
  }

  getStatusColor(status: string) {
    if (status === 'accepted') return 'green';
    else if (status === 'pending') return 'grey';
    else return 'red';
  }
}
