import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginStart } from './store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  constructor(private store: Store) {}

  loginForm = new FormGroup({
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', [Validators.required]),
  });

  logInUser(loginData: FormGroup): void {
    const email = loginData.value.emailField;
    const password = loginData.value.passwordField;
    this.store.dispatch(loginStart({ email, password }));
  }
}
