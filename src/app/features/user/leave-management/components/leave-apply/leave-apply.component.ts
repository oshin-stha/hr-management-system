import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent implements OnInit {
  leaveApplicationForm = new FormGroup({});
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  userEmail: string | null = '';

  constructor(
    private formService: LeaveFormService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.leaveApplicationForm = this.formService.leaveApplicationForm;
    this.userEmail = localStorage.getItem('Email');
  }

  applyForLeave(formData: FormGroup): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    if (this.userEmail != null)
      this.formService.applyForLeave(formData, this.userEmail);
  }
}
