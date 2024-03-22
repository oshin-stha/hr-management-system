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
  resetLeaveOverview,
  updateLeaveBalance,
} from './store/leave-overview.action';
import { loadLeaveDetails } from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import { Subscription } from 'rxjs';
import { DEPARTMENT_OPTION } from 'src/app/shared/constants/departmentoption.constants';
import { LEAVE_DATES } from 'src/app/shared/constants/leave-dates.constants';
import { LEAVE_TYPE } from 'src/app/shared/constants/sickleave.constant';

@Component({
  selector: 'app-leave-overview',
  templateUrl: './leave-overview.component.html',
  styleUrls: ['./leave-overview.component.scss'],
})
export class LeaveOverviewComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  DEPARTMENT_OPTION = DEPARTMENT_OPTION;
  LEAVE_DATES = LEAVE_DATES;
  LEAVE_TYPE = LEAVE_TYPE;
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
  currentDate = new Date();
  today = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate(),
  );
  tomorrow = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() + 1,
  );
  filteredLeaves: LeaveDetails[] = [];

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
    if (this.selectedDateFilter === 'today') this.filterTodayLeaveDetails();
    else if (this.selectedDateFilter === 'tomorrow')
      this.filterTommorowLeaveDetails();
    else this.filteredLeaves = this.leaveDetails;
    this.filterUserDetails();
  }

  filterTodayLeaveDetails(): void {
    this.filteredLeaves = this.leaveDetails.filter((leave) => {
      const leaveFrom = leave.leaveFrom.toDate();
      return (
        leaveFrom.getFullYear() === this.today.getFullYear() &&
        leaveFrom.getMonth() === this.today.getMonth() &&
        leaveFrom.getDate() === this.today.getDate()
      );
    });
  }

  filterTommorowLeaveDetails(): void {
    this.filteredLeaves = this.leaveDetails.filter((leave) => {
      const leaveFrom = leave.leaveFrom.toDate();
      const leaveTo = leave.leaveTo.toDate();
      const leaveStartsTomorrow =
        leaveFrom.getFullYear() === this.tomorrow.getFullYear() &&
        leaveFrom.getMonth() === this.tomorrow.getMonth() &&
        leaveFrom.getDate() === this.tomorrow.getDate();
      return (
        (this.tomorrow >= leaveFrom && this.tomorrow <= leaveTo) ||
        leaveStartsTomorrow
      );
    });
  }

  filterUserDetails(): void {
    const filteredUserDetails = this.userDetails.filter((user) => {
      return this.filteredLeaves.some((leave) => leave.email === user.email);
    });
    this.dataSource.data = this.filteredLeaves.map((leave) => {
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
    this.store.dispatch(resetLeaveOverview());
  }
}
