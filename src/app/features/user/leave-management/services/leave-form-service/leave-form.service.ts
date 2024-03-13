import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import { Store } from '@ngrx/store';
import { leaveApplicationStart } from '../../store/applyLeaveState/applyLeave.action';

@Injectable({
  providedIn: 'root',
})
export class LeaveFormService {
  leaveApplicationForm = new FormGroup({});
  constructor(private store: Store) {
    this.leaveApplicationForm = this.createLeaveApplicationForm();
  }

  private createLeaveApplicationForm(): FormGroup {
    return new FormGroup({
      [FORM_CONTROL_NAMES.LEAVE_FROM]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.LEAVE_TO]: new FormControl('', [Validators.required]),
      [FORM_CONTROL_NAMES.LEAVE_TYPE]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.REASON_FOR_LEAVE]: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  applyForLeave(formData: FormGroup, userEmail: string) {
    const email = userEmail;
    const leaveFrom = formData.value.leaveFrom;
    const leaveTo = formData.value.leaveTo;
    const timeDifference =
      formData.value.leaveTo.getTime() - formData.value.leaveFrom.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const totalLeaveDays = daysDifference;
    const leaveType = formData.value.leaveType;
    const reasonForLeave = formData.value.reasonForLeave;
    const status = 'pending';

    const payload: LeaveDetails = {
      email,
      leaveFrom,
      leaveTo,
      totalLeaveDays,
      leaveType,
      reasonForLeave,
      status,
    };
    this.store.dispatch(leaveApplicationStart({ leaveDetails: payload }));
  }
}
