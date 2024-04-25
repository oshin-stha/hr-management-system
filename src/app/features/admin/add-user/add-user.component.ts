import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { getLoading } from 'src/app/shared/store/loader-store/selector/loader-spinner.selector';
import { AddUserService } from './services/add-user/add-user.service';
import { FormService } from './services/form/form.service';
import {
  addUserStart,
  addleaveBalance,
  resetUserData,
  signupStart,
} from './store/add-user.action';
import { FORM_ERRORS } from 'src/app/shared/constants/errors.constants';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { GENDER } from 'src/app/shared/constants/gender.constants';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { DEPARTMENT_OPTION } from 'src/app/shared/constants/departmentoption.constants';
import { leaveBalance } from 'src/app/shared/models/adduser.model';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnDestroy {
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  FORM_ERRORS = FORM_ERRORS;
  DEPARTMENT_OPTION = DEPARTMENT_OPTION;
  GENDER = GENDER;
  ROLE = ROLE;
  emailExists = false;
  errorMessage: string | null = null;
  loadingSubscription: Subscription | undefined;
  actionPerformed: boolean | undefined;
  password_hide = true;

  constructor(
    private addUserService: AddUserService,
    private router: Router,
    private store: Store,
    private formService: FormService,
  ) {}

  signupForm: FormGroup = this.formService.createSignupForm();

  addUserDetail(): void {
    const signupPayload = this.formService.getUserSignupPayload(
      this.signupForm,
    );
    if (signupPayload) {
      const { email, password, employeeId } = signupPayload;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signupStart({ email, password, employeeId }));
      this.loadingSubscription = this.store
        .select(getLoading)
        .subscribe((loading) => {
          const emailExist = this.addUserService.emailAlreadyExistsStatus;
          if (!loading && !emailExist) {
            const userDetails = this.formService.getUserDetailsFromForm(
              this.signupForm,
            );

            if (userDetails) {
              this.store.dispatch(addUserStart({ data: userDetails }));
              // const leaveBalance = this.formService.getLeaveBalance();
              const leaveBalance: leaveBalance = {} as leaveBalance;
              this.addUserService.getLeaveBalance().subscribe((res) => {
                leaveBalance.annualLeaveTotal = res.annualLeave;
                leaveBalance.annualLeaveRemaining = res.annualLeave;
                leaveBalance.sickLeaveTotal = res.sickLeave;
                leaveBalance.sickLeaveRemaining = res.sickLeave;
                this.store.dispatch(addleaveBalance({ email, leaveBalance }));
              });
            }
            this.signupForm.reset();
          } else {
            return;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetUserData());
    this.loadingSubscription?.unsubscribe();
  }
}
