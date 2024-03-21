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
import { Store, select } from '@ngrx/store';
import { UserDetails } from 'src/app/shared/models/adduser.model';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import {
  acceptLeaveRequest,
  rejectLeaveRequest,
  updateLeaveBalance,
} from './store/leave-overview.action';
import { loadLeaveDetails } from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-overview',
  templateUrl: './leave-overview.component.html',
  styleUrls: ['./leave-overview.component.scss'],
})
export class LeaveOverviewComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  leaveDetails: LeaveDetails[] = [];
  userDetails: UserDetails[] = [];
  displayedColumns: string[] = [
    'id',
    'employeeName',
    'department',
    'leaveType',
    'contactInformation',
    'leaveFrom',
    'leaveTo',
    'reasonForLeave',
    'status',
    'totalLeaveDays',
    'action',
  ];
  dataSource = new MatTableDataSource<LeaveDetails>([]);
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  selectedDepartment = '';
  selectedLeaveType = '';
  selectedDateFilter = 'all';
  getLeaveDetailSubscription: Subscription | undefined;
  getUserDetailsSubscription: Subscription | undefined;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadLeaveDetails();
  }

  loadLeaveDetails() {
    this.getLeaveDetailSubscription = this.store
      .pipe(select(getLeaveDetails))
      .subscribe((data) => {
        this.leaveDetails = data;
        this.dataSource.data = this.leaveDetails;
        this.updateDataSource();
      });
    this.getUserDetailsSubscription = this.store
      .pipe(select(selectUserDetails))
      .subscribe((data) => {
        this.userDetails = data;
        this.updateDataSource();
      });
    this.applyDepartmentFilter();
    this.applyLeaveTypeFilter();
    this.store.dispatch(loadLeaveDetails());
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
  acceptLeave(
    id: string,
    totalLeaveDays: number,
    email: string,
    leaveType: string,
  ): void {
    this.store.dispatch(acceptLeaveRequest({ id }));
    this.store.dispatch(
      updateLeaveBalance({ email, totalLeaveDays, leaveType }),
    );
    this.loadLeaveDetails();
  }

  rejectLeave(id: string): void {
    this.store.dispatch(rejectLeaveRequest({ id }));
    this.loadLeaveDetails();
  }

  updateDataSource(): void {
    if (this.leaveDetails.length > 0 && this.userDetails.length > 0) {
      const modifiedLeaveDetails = this.leaveDetails.map((leaveDetail) => {
        const userDetails = this.userDetails.find(
          (user) => user.email === leaveDetail.email,
        );
        if (userDetails) {
          return {
            ...leaveDetail,
            employeeName: `${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`,
            department: userDetails.department,
            contactInformation: userDetails.contactNumber,
          };
        } else {
          return leaveDetail;
        }
      });
      this.dataSource.data = modifiedLeaveDetails;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }
  applyDepartmentFilter(): void {
    if (this.selectedDepartment) {
      this.dataSource.filter = this.selectedDepartment.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  applyLeaveTypeFilter(): void {
    if (this.selectedLeaveType) {
      this.dataSource.filter = this.selectedLeaveType.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  applyDateFilter(): void {
    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const tomorrow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    let filteredLeaves: LeaveDetails[] = [];
    if (this.selectedDateFilter === 'today') {
      filteredLeaves = this.leaveDetails.filter((leave) => {
        const leaveFrom = leave.leaveFrom.toDate();
        return (
          leaveFrom.getFullYear() === today.getFullYear() &&
          leaveFrom.getMonth() === today.getMonth() &&
          leaveFrom.getDate() === today.getDate()
        );
      });
    } else if (this.selectedDateFilter === 'tomorrow') {
      filteredLeaves = this.leaveDetails.filter((leave) => {
        const leaveFrom = leave.leaveFrom.toDate();
        const leaveTo = leave.leaveTo.toDate();
        const leaveStartsTomorrow =
          leaveFrom.getFullYear() === tomorrow.getFullYear() &&
          leaveFrom.getMonth() === tomorrow.getMonth() &&
          leaveFrom.getDate() === tomorrow.getDate();
        return (
          (tomorrow >= leaveFrom && tomorrow <= leaveTo) || leaveStartsTomorrow
        );
      });
    } else {
      filteredLeaves = this.leaveDetails;
    }
    const filteredUserDetails = this.userDetails.filter((user) => {
      return filteredLeaves.some((leave) => leave.email === user.email);
    });
    this.dataSource.data = filteredLeaves.map((leave) => {
      const userDetails = filteredUserDetails.find(
        (user) => user.email === leave.email,
      );
      return {
        ...leave,
        employeeName: userDetails
          ? `${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`
          : '',
        department: userDetails ? userDetails.department : '',
        contactInformation: userDetails ? userDetails.contactNumber : 0,
      };
    });
  }

  ngOnDestroy(): void {
    this.getLeaveDetailSubscription?.unsubscribe();
    this.getUserDetailsSubscription?.unsubscribe();
  }
}
