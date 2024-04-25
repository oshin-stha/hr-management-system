import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Policy } from '../../models/policy.interface';

@Injectable({
  providedIn: 'root',
})
export class AddPolicyFormService {
  #form: FormGroup = new FormGroup({});
  #leaveForm: FormGroup = new FormGroup({});

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
      policyType: ['', Validators.required],
      policyList: this.fb.array([]),
      sickLeave: ['', [Validators.min(1), Validators.max(50)]],
      annualLeave: ['', [Validators.min(1), Validators.max(50)]],
    });
  }
}
