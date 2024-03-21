import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_ERRORS } from 'src/app/shared/constants/errors.constants';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LoginFormService } from './login-form/login-form.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  FORM_ERRORS = FORM_ERRORS;
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  loginForm = new FormGroup({});

  constructor(private formService: LoginFormService) {}

  ngOnInit(): void {
    this.loginForm = this.formService.loginForm;
    localStorage.removeItem('Email');
  }

  logInUser(): void {
    this.formService.logInUser();
  }
}
