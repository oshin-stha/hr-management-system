import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddPolicyFormService {
  #form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get form(): FormGroup {
    return this.#form;
  }

  createAddPolicyForm(): void {
    this.#form = this.fb.group({
      policyType: ['', Validators.required],
      policyList: this.fb.array([]),
    });
  }
}
