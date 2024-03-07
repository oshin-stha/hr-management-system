import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-spinner.action';
import { getLoading } from 'src/app/shared/store/loader-spinner.selector';
import { UserDetails } from '../models/adduser.model';
import { AddUserService } from '../services/add-user.service';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  signupFail,
  signupStart,
  signupSuccess,
} from './store/add-user.action';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  emailExists = false;
  errorMessage: string | null = null;
  loadingSubscription: Subscription | undefined;
  constructor(
    private addUserService: AddUserService,
    private router: Router,
    private store: Store,
  ) {}
  password_hide = true;

  ngOnInit() {
    console.log('Hello');
  }
  signupForm: FormGroup = new FormGroup({
    employeeId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    citizenshipNumber: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  addUserDetail(signupData: FormGroup): void {
    const data = signupData.value;
    const email = data.email;
    const password = data.password;
    const employeeId = data.employeeId;
    const userDetailsPayload: UserDetails = {
      employeeId: data.employeeId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      contactNumber: data.contactNumber,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      citizenshipNumber: data.citizenshipNumber,
      startDate: data.startDate,
      department: data.department,
      role: data.role,
      designation: data.designation,
      email: data.email,
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password, employeeId }));
    this.store.dispatch(signupSuccess());
    this.loadingSubscription = this.store
      .select(getLoading)
      .subscribe(async (loading) => {
        const emailExist = this.addUserService.emailAlreadyExistsStatus;
        if (!loading && !emailExist) {
          this.store.dispatch(addUserStart({ data: userDetailsPayload }));
          this.store.dispatch(addUserSuccess({ redirect: true }));
          this.signupForm.reset();
        } else {
          this.store.dispatch(signupFail());
          this.store.dispatch(addUserFail());
          return;
        }
      });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
