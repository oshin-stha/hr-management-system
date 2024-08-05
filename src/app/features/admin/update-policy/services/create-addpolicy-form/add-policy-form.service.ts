import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Policy } from '../../models/policy.interface';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';

@Injectable({
  providedIn: 'root',
})
export class AddPolicyFormService {
  #form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get form(): FormGroup {
    return this.#form;
  }

  createPolicyPayload(): Policy {
    const policyType = this.form.get('policyType')?.value;
    const policyList = this.form.get('policyList')?.value;
    return { policyType, policyList };
  }

  createAddPolicyForm(): void {
    this.#form = this.fb.group({
      [FORM_CONTROL_NAMES.POLICY_TYPE]: ['', Validators.required],
      [FORM_CONTROL_NAMES.POLICY_LIST]: this.fb.array([]),
      [FORM_CONTROL_NAMES.SICK_LEAVE]: [
        '',
        [Validators.min(1), Validators.max(50)],
      ],
      [FORM_CONTROL_NAMES.ANNUAL_LEAVE]: [
        '',
        [Validators.min(1), Validators.max(50)],
      ],
    });
  }
}
