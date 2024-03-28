import { Injectable } from '@angular/core';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { Store } from '@ngrx/store';
import { leaveApplicationStart } from '../../store/applyLeaveState/applyLeave.action';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import { PENDING_STATUS } from 'src/app/shared/constants/status.constant';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { ALERT_MESSAGE } from 'src/app/shared/constants/alert confirmation.constants';
import { LeaveCount } from 'src/app/features/admin/leave-trend/models/leave-count.interface';
import * as moment from 'moment';
import { DATE_FORMAT, DAY } from 'src/app/shared/constants/email.constant';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable({
  providedIn: 'root',
})
export class ApplyLeaveService {
  leaveBalance: LeaveBalanceDetails | undefined;
  totalLeaveDays: number | undefined;
  firstOrSecondHalfOrFullDay: string | undefined;

  constructor(private store: Store) {}

  applyForLeave(
    formData: FormGroup,
    userEmail: string,
    leaveBalance: LeaveBalanceDetails,
    isHalfDay: boolean,
    department: string,
    leavesTakenBySelf: LeaveCount[],
  ) {
    this.leaveBalance = leaveBalance;
    const leaveType = formData.value.leaveType;
    this.checkIfHalfOrFullDay(isHalfDay, formData);

    if (this.totalLeaveDays) {
      if (
        this.cleckIfLeaveDatesConcidesWithTheLeaveTakenAlready(
          leavesTakenBySelf,
          this.createPayload(
            userEmail,
            formData,
            department,
            this.totalLeaveDays,
          ),
        )
      ) {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return;
      } else
        this.alertMessageOrDispatch(
          this.createPayload(
            userEmail,
            formData,
            department,
            this.totalLeaveDays,
          ),
          leaveBalance,
          leaveType,
          this.totalLeaveDays,
        );
    }
  }

  createPayload(
    userEmail: string,
    formData: FormGroup,
    department: string,
    totalLeaveDays: number,
  ): LeaveDetails {
    const payload: LeaveDetails = {
      email: userEmail,
      leaveFrom: formData.value.leaveFrom,
      leaveTo: formData.value.leaveTo
        ? formData.value.leaveTo
        : formData.value.leaveFrom,
      firstOrSecondHalf: this.firstOrSecondHalfOrFullDay
        ? this.firstOrSecondHalfOrFullDay
        : LEAVE_TYPE.FIRST_HALF_LEAVE,
      totalLeaveDays: totalLeaveDays,
      leaveType: formData.value.leaveType,
      reasonForLeave: formData.value.reasonForLeave,
      status: PENDING_STATUS,
      fromDepartment: department,
    };
    return payload;
  }

  cleckIfLeaveDatesConcidesWithTheLeaveTakenAlready(
    leavesTakenBySelf: LeaveCount[],
    payload: LeaveDetails,
  ): boolean {
    const startDate = moment(payload.leaveFrom);
    const endDate = moment(payload.leaveTo);
    let alertShown = false;
    for (
      let currentDate = startDate.clone();
      currentDate.isSameOrBefore(endDate);
      currentDate.add(1, DAY)
    ) {
      const currentDateStr = currentDate.format(DATE_FORMAT);
      for (const item of leavesTakenBySelf) {
        if (currentDateStr === item.date && item.count > 0) {
          alert(`${ALERT_MESSAGE.LEAVE_ALREADY_TAKEN} ${item.date}`);
          this.store.dispatch(setLoadingSpinner({ status: false }));
          alertShown = true;
          break;
        }
      }
      if (alertShown) break;
    }
    return alertShown;
  }

  checkIfHalfOrFullDay(isHalfDay: boolean, formData: FormGroup): void {
    if (isHalfDay === false) {
      this.ifNotHalfDay(formData);
    } else {
      this.totalLeaveDays = 0.5;
      this.firstOrSecondHalfOrFullDay = formData.value.firstOrSecondHalf;
    }
  }

  ifNotHalfDay(formData: FormGroup): void {
    if (formData.value.leaveTo && formData.value.leaveFrom) {
      const timeDifference =
        formData.value.leaveTo.getTime() - formData.value.leaveFrom.getTime();
      this.totalLeaveDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    } else this.totalLeaveDays = 1;
    this.firstOrSecondHalfOrFullDay = FORM_CONTROL_NAMES.FULL_LEAVE;
  }

  alertMessageOrDispatch(
    payload: LeaveDetails,
    leaveBalance: LeaveBalanceDetails,
    leaveType: string,
    totalLeaveDays: number,
  ): void {
    if (
      leaveType === LEAVE_TYPE.SICK_LEAVE &&
      totalLeaveDays > leaveBalance.sickLeaveRemaining
    )
      this.alertSickLeave();
    else if (
      leaveType === LEAVE_TYPE.ANNUAL_LEAVE &&
      totalLeaveDays > leaveBalance.annualLeaveRemaining
    )
      this.alertAnnualLeave();
    else this.store.dispatch(leaveApplicationStart({ leaveDetails: payload }));
  }

  alertSickLeave(): void {
    if (this.leaveBalance) {
      this.store.dispatch(setLoadingSpinner({ status: false }));
      alert(
        `${ALERT_MESSAGE.ONLY} ${this.leaveBalance.sickLeaveRemaining} ${ALERT_MESSAGE.SICK_LEAVE_AVAILABLE}`,
      );
    }
  }

  alertAnnualLeave(): void {
    if (this.leaveBalance) {
      this.store.dispatch(setLoadingSpinner({ status: false }));
      alert(
        `${ALERT_MESSAGE.ONLY} ${this.leaveBalance.annualLeaveRemaining} ${ALERT_MESSAGE.ANNUAL_LEAVE_AVAILABLE} `,
      );
    }
  }
}
