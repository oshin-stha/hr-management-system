import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { loadLeaveApplicationDetails } from '../../store/leave-status/leave-status.action';
import { selectStatus } from '../../store/leave-status/selector/leave-status.selector';
import { LeaveAppDetails } from '../../models/leave-app-details.interface';
import { DASHBOARD_LEAVE_COLUMNS } from 'src/app/shared/constants/dashboard-leave-details.constants';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss'],
})
export class LeaveStatusComponent implements OnInit {
  leaveAppDetails: LeaveAppDetails[] = [];
  dataSource = new MatTableDataSource<LeaveAppDetails>([]);
  displayedColumns: string[] = DASHBOARD_LEAVE_COLUMNS;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadLeaveDetails();
  }

  loadLeaveDetails() {
    this.store.select(selectStatus).subscribe((res) => {
      this.leaveAppDetails = res;
      this.dataSource.data = this.leaveAppDetails;
    });
    this.store.dispatch(loadLeaveApplicationDetails());
  }

  formatTimestamp(timestamp: Timestamp) {
    return timestamp.toDate().toLocaleDateString();
  }
}
