import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';
import { getLoading } from 'src/app/shared/store/loader-spinner.selector';
import { UserDetails } from '../models/adduser.model';
import { AddUserService } from '../services/add-user/add-user.service';
import { FormService } from '../services/form/form.service';
import { addUserStart, signupStart } from './store/add-user.action';
import { FORM_ERRORS } from 'src/app/shared/constants/errors.constants';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnDestroy {
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  FORM_ERRORS = FORM_ERRORS;
  emailExists = false;
  errorMessage: string | null = null;
  loadingSubscription: Subscription | undefined;

  constructor(
    private addUserService: AddUserService,
    private router: Router,
    private store: Store,
    private formService: FormService,
  ) {}

  password_hide = true;
  signupForm: FormGroup = this.formService.createSignupForm();

  addUserDetail(): void {
    const userDetails: UserDetails | null =
      this.formService.getUserDetailsFromForm(this.signupForm);

    if (userDetails) {
      const { email, password, employeeId } = userDetails;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signupStart({ email, password, employeeId }));

      this.loadingSubscription = this.store
        .select(getLoading)
        .subscribe(async (loading) => {
          const emailExist = this.addUserService.emailAlreadyExistsStatus;
          if (!loading && !emailExist) {
            this.store.dispatch(addUserStart({ data: userDetails }));
          } else {
            return;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
