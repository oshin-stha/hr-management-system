import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
import { Store } from '@ngrx/store';
// import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { getLeavebalanceStart } from '../../store/leaveBalanceState/leaveBalance.action';
import { getLeaveBalance } from '../../store/leaveBalanceState/leaveBalance.selector';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import { loadLeaveDetails } from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import { MatSelectChange } from '@angular/material/select';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import {
  ACCEPTED_STATUS,
  PENDING_STATUS,
} from 'src/app/shared/constants/status.constant';
import * as moment from 'moment';
import { LeaveCount } from 'src/app/features/admin/leave-trend/models/leave-count.interface';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent implements OnInit, OnDestroy {
  leaveApplicationForm = new FormGroup({});
  getLeaveDetailsSubscriber: Subscription = new Subscription();
  getLeaveBalanceSubscriber: Subscription = new Subscription();
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  LEAVE_TYPES = LEAVE_TYPE;
  userEmail: string | null = '';
  annualLeaveRemaining: number | undefined;
  sickLeaveRemaining: number | undefined;
  leaveBalance: LeaveBalanceDetails | undefined;
  isHalfDay: boolean | undefined = false;
  minDateForLeaveFrom = new Date();
  minDateForLeaveTo: Date | undefined;
  leaveDetails: LeaveDetails[] = [];
  department: string | undefined;
  leavesToTake: string[] = [];
  leavesTakenByEmployees: LeaveCount[] = [];
  date: string | undefined;

  constructor(
    private formService: LeaveFormService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.leaveApplicationForm = this.formService.leaveApplicationForm;
    this.leaveApplicationForm.reset();
    this.userEmail = localStorage.getItem('Email');
    this.getUserDetails();
    this.statrtGetLeaveBalance();
    this.getLeaveBalance();
    this.checkingIfUserCanTakeSpecialLeave();
    this.getLeaveDetails();
  }

  ngOnDestroy(): void {
    this.getLeaveBalanceSubscriber.unsubscribe();
    this.getLeaveDetailsSubscriber.unsubscribe();
  }

  updateMinDateForLeaveTo(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const selectedDate = new Date(event.value);
      selectedDate.setDate(selectedDate.getDate() + 1);
      this.minDateForLeaveTo = selectedDate;
    }
  }

  statrtGetLeaveBalance(): void {
    if (this.userEmail)
      this.store.dispatch(getLeavebalanceStart({ email: this.userEmail }));
  }

  getLeaveDetails(): void {
    this.store.dispatch(loadLeaveDetails());
    this.getLeaveDetailsSubscriber = this.store
      .select(getLeaveDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
        this.getDatesOfLeavesAccepted();
      });
  }

  getUserDetails(): void {
    this.store.select(selectUserDetails).subscribe((res) => {
      res.forEach((element) => {
        if (this.userEmail && this.userEmail === element.email) {
          this.department = element.department;
          this.getDatesOfLeavesAccepted();
        }
      });
    });
  }

  getLeaveBalance(): void {
    this.getLeaveBalanceSubscriber = this.store
      .select(getLeaveBalance)
      .subscribe((res) => {
        this.leaveBalance = res;
        this.annualLeaveRemaining = res.annualLeaveRemaining;
        this.sickLeaveRemaining = res.sickLeaveRemaining;
      });
  }

  checkingIfUserCanTakeSpecialLeave(): boolean {
    if (this.annualLeaveRemaining && this.sickLeaveRemaining) {
      if (this.annualLeaveRemaining > 0 && this.sickLeaveRemaining > 0)
        return true;
    }
    return false;
  }

  checkingIfUserCanTakeSickLeave(): boolean {
    if (this.sickLeaveRemaining) {
      if (this.sickLeaveRemaining > 0) return false;
    }
    return true;
  }

  checkingIfUserCanTakeAnnualLeave(): boolean {
    if (this.annualLeaveRemaining) {
      if (this.annualLeaveRemaining > 0) return false;
    }
    return true;
  }

  getDatesOfLeaveToTake(formData: FormGroup): void {
    const startDate = moment(formData.value.leaveFrom);
    const endDate = moment(formData.value.leaveTo);
    while (startDate.isBefore(endDate)) {
      this.leavesToTake.push(startDate.format('YYYY-MM-DD'));
      startDate.add(1, 'day');
    }
  }

  getDatesOfLeavesAccepted(): void {
    const leaveCountsMap = new Map<string, number>();
    console.log(this.leaveDetails);
    console.log(this.department);
    for (const item of this.leaveDetails) {
      if (
        this.department &&
        item.status === PENDING_STATUS &&
        item.fromDepartment === this.department
      ) {
        const leaveStartDate = moment(item.leaveFrom);
        const leaveEndDate = moment(item.leaveTo);

        while (leaveStartDate.isBefore(leaveEndDate)) {
          const dateKey = leaveStartDate.format('YYYY-MM-DD');
          const currentCount = leaveCountsMap.get(dateKey);
          leaveCountsMap.set(dateKey, (currentCount ?? 0) + 1);
          leaveStartDate.add(1, 'day');
        }
      }
      this.leavesTakenByEmployees = Array.from(
        leaveCountsMap,
        ([date, count]) => ({ date, count }),
      );
    }
    console.log(this.leavesTakenByEmployees);
  }

  checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen(): boolean {
    let moreEmployeesHaveTakenLeave = false;
    this.leavesToTake.forEach((item) => {
      this.leavesTakenByEmployees.forEach((element) => {
        if (item === element.date && element.count > 5) {
          const confirmation = confirm(
            `Large number of leaves on ${element.date}. Do you still want to proceed?`,
          );
          if (!confirmation) {
            moreEmployeesHaveTakenLeave = true;
          }
        }
      });
    });

    return moreEmployeesHaveTakenLeave;
  }

  applyForLeave(formData: FormGroup): void {
    this.getDatesOfLeaveToTake(formData);
    this.checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen();
    if (
      this.checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen() &&
      this.userEmail &&
      this.leaveBalance &&
      this.isHalfDay != undefined &&
      this.department
    ) {
      this.formService.applyForLeave(
        formData,
        this.userEmail,
        this.leaveBalance,
        this.isHalfDay,
        this.department,
      );
    }
  }

  onInputChange(event: MatSelectChange): void {
    if (event.value === FORM_CONTROL_NAMES.HALF_DAY_LEAVE)
      this.isHalfDay = true;
    else this.isHalfDay = false;
  }
}
