import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddPolicyFormService } from '../../../services/create-addpolicy-form/add-policy-form.service';
import { UpdatePolicyService } from '../../../services/update-policy/update-policy.service';
import { Store } from '@ngrx/store';
import { addPolicyStart } from '../../../store/add-policy/add-policy.action';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss'],
})
export class AddPolicyComponent implements OnInit {
  // addPolicyForm = new FormGroup({});
  selected = '';
  selectPolicyTypeFlag = false;
  policyContents: string[] = [];

  constructor(
    private fb: FormBuilder,
    private addPolicyFormService: AddPolicyFormService,
    private updatePolicyService: UpdatePolicyService,
    private store: Store,
  ) {}

  get policyListArrayControl(): AbstractControl[] {
    return (this.form.get('policyList') as FormArray).controls;
  }

  get form(): FormGroup {
    return this.addPolicyFormService.form;
  }

  ngOnInit(): void {
    this.buildAddPolicyForm();
  }

  addPolicy(): void {
    (<FormArray>this.form.get('policyList')).push(
      this.fb.control('', Validators.required),
    );
  }

  removePolicy(index: number): void {
    (<FormArray>this.form.get('policyList')).removeAt(index);
  }

  submitPolicy(): void {
    this.selectPolicyTypeFlag = false;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(addPolicyStart({ policy: this.form.value }));

    this.form.reset();
    this.form.setControl('policyList', this.fb.array([]));
  }

  patchFormValue() {
    this.selectPolicyTypeFlag = true;
    this.updatePolicyService
      .patchValuetoForm(this.selected)
      .subscribe((data) => {
        this.policyContents = data;
        //patching value to formArray
        (<FormArray>this.form.get('policyList')).clear();
        for (const content of this.policyContents) {
          (<FormArray>this.form.get('policyList')).push(
            this.fb.control(content, Validators.required),
          );
        }
      });
  }

  buildAddPolicyForm(): void {
    this.addPolicyFormService.createAddPolicyForm();
  }
}
