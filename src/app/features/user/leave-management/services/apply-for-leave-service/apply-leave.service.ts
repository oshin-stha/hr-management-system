import { Injectable } from '@angular/core';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { Store } from '@ngrx/store';
import { leaveApplicationStart } from '../../store/applyLeaveState/applyLeave.action';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import { PENDING_STATUS } from 'src/app/shared/constants/status.constant';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { ALERT_MESSAGE } from 'src/app/shared/constants/alert-and-ci=onfirmation.constants';

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
  ) {
    this.leaveBalance = leaveBalance;
    const leaveType = formData.value.leaveType;
    this.checkIfHalfOrFullDay(isHalfDay, formData);

    if (this.totalLeaveDays) {
      const payload: LeaveDetails = {
        email: userEmail,
        leaveFrom: formData.value.leaveFrom,
        leaveTo: formData.value.leaveTo
          ? formData.value.leaveTo
          : formData.value.leaveFrom,
        firstOrSecondHalf: this.firstOrSecondHalfOrFullDay
          ? this.firstOrSecondHalfOrFullDay
          : LEAVE_TYPE.FIRST_HALF_LEAVE,
        totalLeaveDays: this.totalLeaveDays,
        leaveType: formData.value.leaveType,
        reasonForLeave: formData.value.reasonForLeave,
        status: PENDING_STATUS,
        fromDepartment: department,
      };
      this.alertMessageOrDispatch(
        payload,
        leaveBalance,
        leaveType,
        this.totalLeaveDays,
      );
    }
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
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
      this.totalLeaveDays = daysDifference;
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
      alert(
        `${ALERT_MESSAGE.ONLY} ${this.leaveBalance.sickLeaveRemaining} ${ALERT_MESSAGE.SICK_LEAVE_AVAILABLE}`,
      );
    }
  }

  alertAnnualLeave(): void {
    if (this.leaveBalance) {
      alert(
        `${ALERT_MESSAGE.ONLY} ${this.leaveBalance.annualLeaveRemaining} ${ALERT_MESSAGE.ANNUAL_LEAVE_AVAILABLE} `,
      );
    }
  }
}
