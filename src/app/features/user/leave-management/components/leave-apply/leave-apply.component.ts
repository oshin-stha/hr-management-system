import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
import { Store } from '@ngrx/store';
import {
  getLeavebalanceReset,
  getLeavebalanceStart,
} from '../../store/leaveBalanceState/leaveBalance.action';
import { getLeaveBalance } from '../../store/leaveBalanceState/leaveBalance.selector';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import {
  loadLeaveDetails,
  loadUserDetails,
  resetLeaveDetails,
  resetUserDetails,
} from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import { MatSelectChange } from '@angular/material/select';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import { ACCEPTED_STATUS } from 'src/app/shared/constants/status.constant';
import * as moment from 'moment';
import { LeaveCount } from 'src/app/features/admin/leave-trend/models/leave-count.interface';
import { FORM_ERRORS } from 'src/app/shared/constants/errors.constants';
import { ApplyLeaveService } from '../../services/apply-for-leave-service/apply-leave.service';
import { LEAVE_APPLY_FORM_CONSTANTS } from 'src/app/shared/constants/leaveDetails.constants';
import { ALERT_MESSAGE } from 'src/app/shared/constants/alert-and-ci=onfirmation.constants';
import {
  DATE_FORMAT,
  DAY,
  EMAIL,
} from 'src/app/shared/constants/email.constant';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent implements OnInit, OnDestroy {
  leaveApplicationForm = new FormGroup({});
  getLeaveDetailsSubscriber: Subscription = new Subscription();
  getUserDetailsSubscriber: Subscription = new Subscription();
  getLeaveBalanceSubscriber: Subscription = new Subscription();
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  LEAVE_TYPES = LEAVE_TYPE;
  userEmail: string | null = '';
  leaveBalance: LeaveBalanceDetails | undefined;
  isHalfDay: boolean | undefined = false;
  minDateForLeaveFrom = new Date();
  minDateForLeaveTo: Date | undefined;
  leaveDetails: LeaveDetails[] = [];
  department: string | undefined;
  leavesToTake: string[] = [];
  leavesTakenByEmployees: LeaveCount[] = [];
  date: string | undefined;
  isAnnualLeaveDisabled: boolean | undefined = false;
  isSpeciaalLeaveDisable: boolean | undefined = false;
  isSickLeaveDisabled: boolean | undefined = false;
  FORM_ERRORS = FORM_ERRORS;
  LEAVE_APPLY_FORM_CONSTANTS = LEAVE_APPLY_FORM_CONSTANTS;

  constructor(
    private formService: LeaveFormService,
    private leaveApplyService: ApplyLeaveService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.leaveApplicationForm = this.formService.leaveApplicationForm;
    this.leaveApplicationForm.reset();
    this.userEmail = localStorage.getItem(EMAIL);
    this.getUserDetails();
    this.getLeaveDetails();
    this.getLeaveBalance();
  }

  ngOnDestroy(): void {
    this.getLeaveBalanceSubscriber.unsubscribe();
    this.getUserDetailsSubscriber.unsubscribe;
    this.getLeaveDetailsSubscriber.unsubscribe();
    this.store.dispatch(getLeavebalanceReset());
    this.store.dispatch(resetUserDetails());
    this.store.dispatch(resetLeaveDetails());
  }

  updateMinDateForLeaveTo(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const selectedDate = new Date(event.value);
      selectedDate.setDate(selectedDate.getDate());
      this.minDateForLeaveTo = selectedDate;
    }
  }

  startGetLeaveBalance(): void {
    if (this.userEmail) {
      this.store.dispatch(getLeavebalanceStart({ email: this.userEmail }));
    }
  }

  getLeaveBalance(): void {
    this.getLeaveBalanceSubscriber = this.store
      .select(getLeaveBalance)
      .subscribe((res) => {
        this.leaveBalance = res;
        this.checkingIfUserCanTakeAnnualLeave(res);
        this.checkingIfUserCanTakeSickLeave(res);
        this.checkingIfUserCanTakeSpecialLeave(res);
      });
    this.startGetLeaveBalance();
  }

  getUserDetails(): void {
    this.getUserDetailsSubscriber = this.store
      .select(selectUserDetails)
      .subscribe((res) => {
        res.forEach((element) => {
          if (this.userEmail && this.userEmail === element.email) {
            this.department = element.department;
          }
        });
      });
    this.store.dispatch(loadUserDetails());
  }

  getLeaveDetails(): void {
    this.getLeaveDetailsSubscriber = this.store
      .select(getLeaveDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
      });
    this.store.dispatch(loadLeaveDetails());
  }

  checkingIfUserCanTakeSpecialLeave(res: LeaveBalanceDetails): void {
    if (res.annualLeaveRemaining < 1 && res.sickLeaveRemaining < 1)
      this.isSpeciaalLeaveDisable = false;
    else this.isSpeciaalLeaveDisable = true;
  }

  checkingIfUserCanTakeSickLeave(res: LeaveBalanceDetails): void {
    if (res.sickLeaveRemaining > 0) this.isSickLeaveDisabled = false;
    else this.isSickLeaveDisabled = true;
  }

  checkingIfUserCanTakeAnnualLeave(res: LeaveBalanceDetails): void {
    if (res.annualLeaveRemaining > 0) this.isAnnualLeaveDisabled = false;
    else this.isAnnualLeaveDisabled = true;
  }

  getDatesOfLeaveToTake(formData: FormGroup): void {
    const startDate = moment(formData.value.leaveFrom);
    const endDate = moment(formData.value.leaveTo);
    while (startDate.isBefore(endDate)) {
      this.leavesToTake.push(startDate.format(DATE_FORMAT));
      startDate.add(1, DAY);
    }
  }

  getDatesOfLeavesAccepted(): void {
    const leaveCountsMap = new Map<string, number>();
    for (const item of this.leaveDetails) {
      if (
        this.department &&
        item.status === ACCEPTED_STATUS &&
        item.fromDepartment === this.department
      ) {
        const leaveStartDate = moment(item.leaveFrom);
        const leaveEndDate = moment(item.leaveTo);
        this.getCountForTotalLEavesTaken(
          leaveStartDate,
          leaveEndDate,
          leaveCountsMap,
        );
      }
    }
    this.leavesTakenByEmployees = Array.from(
      leaveCountsMap,
      ([date, count]) => ({ date, count }),
    );
  }

  getCountForTotalLEavesTaken(
    leaveStartDate: moment.Moment,
    leaveEndDate: moment.Moment,
    leaveCountsMap: Map<string, number>,
  ): void {
    while (leaveStartDate.isBefore(leaveEndDate)) {
      const dateKey = leaveStartDate.format(DATE_FORMAT);
      const currentCount = leaveCountsMap.get(dateKey) || 0;
      leaveCountsMap.set(dateKey, currentCount + 1);
      leaveStartDate.add(1, DAY);
    }
  }

  checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen(): boolean {
    let confirmationShown = false;
    for (const item of this.leavesToTake) {
      for (const element of this.leavesTakenByEmployees) {
        if (item === element.date && element.count > 5) {
          if (!confirmationShown) {
            const confirmation = confirm(
              `${ALERT_MESSAGE.LARGE_NUMBER_OF_LEAVES} ${element.date} ${ALERT_MESSAGE.STILL_PROCEED}`,
            );
            if (!confirmation) {
              return true;
            }
            confirmationShown = true;
          }
        }
      }
    }
    return false;
  }

  onInputChange(event: MatSelectChange): void {
    if (event.value === FORM_CONTROL_NAMES.HALF_DAY_LEAVE)
      this.isHalfDay = true;
    else this.isHalfDay = false;
  }

  disableLeaveTo(): boolean {
    if (this.isHalfDay) return true;
    return false;
  }

  applyForLeave(formData: FormGroup): void {
    this.getDatesOfLeaveToTake(formData);
    this.getDatesOfLeavesAccepted();
    if (
      !this.checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen() &&
      this.userEmail &&
      this.leaveBalance &&
      this.isHalfDay !== undefined &&
      this.department
    ) {
      this.leaveApplyService.applyForLeave(
        formData,
        this.userEmail,
        this.leaveBalance,
        this.isHalfDay,
        this.department,
      );
    }
  }
}
