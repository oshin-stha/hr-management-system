import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { UserDetails } from '../models/adduser.model';
import { leaveDetails } from './models/leave-overview.model';
import {
  acceptLeaveRequest,
  loadLeaveDetails,
  rejectLeaveRequest,
  updateLeaveBalance,
} from './store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from './store/selector/leave-overview.selector';

@Component({
  selector: 'app-leave-overview',
  templateUrl: './leave-overview.component.html',
  styleUrls: ['./leave-overview.component.scss'],
})
export class LeaveOverviewComponent implements AfterViewInit, OnInit {
  leaveDetails: leaveDetails[] = [];
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
  dataSource = new MatTableDataSource<leaveDetails>([]);
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  selectedDepartment = '';
  selectedLeaveType = '';
  selectedDateFilter = 'all';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadLeaveDetails());
    this.store.pipe(select(getLeaveDetails)).subscribe((data) => {
      this.leaveDetails = data;
      this.dataSource.data = this.leaveDetails;
      this.updateDataSource();
    });
    this.store.pipe(select(selectUserDetails)).subscribe((data) => {
      this.userDetails = data;
      this.updateDataSource();
    });
    this.applyDepartmentFilter();
    this.applyLeaveTypeFilter();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
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
  }

  rejectLeave(id: string): void {
    this.store.dispatch(rejectLeaveRequest({ id }));
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
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    let filteredLeaves: leaveDetails[] = [];
    if (this.selectedDateFilter === 'today') {
      filteredLeaves = this.leaveDetails.filter((leave) => {
        const leaveFrom = new Date(leave.leaveFrom);
        return (
          leaveFrom.getFullYear() === today.getFullYear() &&
          leaveFrom.getMonth() === today.getMonth() &&
          leaveFrom.getDate() === today.getDate()
        );
      });
    } else if (this.selectedDateFilter === 'tomorrow') {
      filteredLeaves = this.leaveDetails.filter((leave) => {
        const leaveFrom = new Date(leave.leaveFrom);
        return (
          leaveFrom.getFullYear() === tomorrow.getFullYear() &&
          leaveFrom.getMonth() === tomorrow.getMonth() &&
          leaveFrom.getDate() === tomorrow.getDate()
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
}
