import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';

@Injectable({
  providedIn: 'root',
})
export class LeaveFormService {
  createLeaveApplicationForm(): FormGroup {
    return new FormGroup({
      [FORM_CONTROL_NAMES.HALF_OR_FULL_LEAVE]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.LEAVE_FROM]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.LEAVE_TO]: new FormControl(''),
      [FORM_CONTROL_NAMES.FIRST_OR_SECOND_HALF]: new FormControl(''),
      [FORM_CONTROL_NAMES.LEAVE_TYPE]: new FormControl('', [
        Validators.required,
      ]),
      [FORM_CONTROL_NAMES.REASON_FOR_LEAVE]: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
