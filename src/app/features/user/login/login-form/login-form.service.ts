import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { getUserDetails, loginStart } from '../store/login.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  loginForm: FormGroup;

  constructor(private store: Store) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return new FormGroup({
      [FORM_CONTROL_NAMES.EMAIL]: new FormControl('', [
        // use short hand
        Validators.required,
        Validators.email,
      ]),
      [FORM_CONTROL_NAMES.PASSWORD]: new FormControl('', [Validators.required]),
    });
  }

  logInUser(): void {
    const email = this.loginForm.get(FORM_CONTROL_NAMES.EMAIL)?.value;
    const password = this.loginForm.get(FORM_CONTROL_NAMES.PASSWORD)?.value;
    if (email && password) {
      this.store.dispatch(loginStart({ email, password })); //chaing
      this.store.dispatch(getUserDetails({ email }));
    }
  }

  resetLoginForm() {
    this.loginForm.reset();
  }
}
