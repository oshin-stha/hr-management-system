import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { Store } from '@ngrx/store';
import { leaveApplicationStart } from '../../store/applyLeaveState/applyLeave.action';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
// import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { PENDING_STATUS } from 'src/app/shared/constants/status.constant';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';

@Injectable({
  providedIn: 'root',
})
export class LeaveFormService {
  leaveApplicationForm = new FormGroup({});
  leaveBalance: LeaveBalanceDetails | undefined;
  totalLeaveDays: number | undefined;
  firstOrSecondHalfOrFullDay: string | undefined;

  constructor(private store: Store) {
    this.leaveApplicationForm = this.createLeaveApplicationForm();
  }

  private createLeaveApplicationForm(): FormGroup {
    return new FormGroup({
      [FORM_CONTROL_NAMES.HALF_OR_FULL_LEAVE]: new FormControl(
        FORM_CONTROL_NAMES.FULL_LEAVE,
        [Validators.required],
      ),
      [FORM_CONTROL_NAMES.LEAVE_FROM]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.LEAVE_TO]: new FormControl('', [Validators.required]),
      [FORM_CONTROL_NAMES.FIRST_OR_SECOND_HALF]: new FormControl(
        FORM_CONTROL_NAMES.FULL_LEAVE,
      ),
      [FORM_CONTROL_NAMES.LEAVE_TYPE]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.REASON_FOR_LEAVE]: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  applyForLeave(
    formData: FormGroup,
    userEmail: string,
    leaveBalance: LeaveBalanceDetails,
    isHalfDay: boolean,
    department: string,
  ) {
    this.leaveBalance = leaveBalance;
    const leaveType = formData.value.leaveType;
    const timeDifference =
      formData.value.leaveTo.getTime() - formData.value.leaveFrom.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (isHalfDay === false) {
      this.totalLeaveDays = daysDifference;
      this.firstOrSecondHalfOrFullDay = FORM_CONTROL_NAMES.FULL_LEAVE;
    } else {
      this.totalLeaveDays = daysDifference * 0.5;
      this.firstOrSecondHalfOrFullDay = formData.value.firstOrSecondHalf;
    }

    if (this.totalLeaveDays && this.firstOrSecondHalfOrFullDay) {
      const payload: LeaveDetails = {
        email: userEmail,
        leaveFrom: formData.value.leaveFrom,
        leaveTo: formData.value.leaveTo,
        firstOrSecondHalf: this.firstOrSecondHalfOrFullDay,
        totalLeaveDays: this.totalLeaveDays,
        leaveType: formData.value.leaveType,
        reasonForLeave: formData.value.reasonForLeave,
        status: PENDING_STATUS,
        fromDepartment: department,
      };

      if (
        leaveType === LEAVE_TYPE.SICK_LEAVE &&
        this.totalLeaveDays > leaveBalance.sickLeaveRemaining
      )
        this.alertSickLeave();
      else if (
        leaveType === LEAVE_TYPE.ANNUAL_LEAVE &&
        this.totalLeaveDays > leaveBalance.annualLeaveRemaining
      )
        this.alertAnnualLeave();
      else
        this.store.dispatch(leaveApplicationStart({ leaveDetails: payload }));
    }
  }

  alertSickLeave(): void {
    if (this.leaveBalance) {
      alert(
        `Only ${this.leaveBalance.sickLeaveRemaining} sick leave available`,
      );
      // this.store.dispatch(setLoadingSpinner({ status: false }))
    }
  }

  alertAnnualLeave(): void {
    if (this.leaveBalance) {
      alert(
        `Only ${this.leaveBalance.annualLeaveRemaining} annual leave available`,
      );
      // this.store.dispatch(setLoadingSpinner({ status: false }))
    }
  }
}
