import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDetails, UserDetails } from '../models/adduser.model';
import { AddUserService } from '../services/add-user.service';
import { Router } from '@angular/router';
import { addUserStart, signupStart } from './store/add-user.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  emailExists = false;
  constructor(private addUserService: AddUserService, private router: Router, private store: Store) { }
  password_hide = true;
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

  })


  addUserDetail(signupData: FormGroup): void {
    const authDetailsPayload: AuthDetails = {
      email: signupData.value.email,
      password: signupData.value.password,
    };
    this.store.dispatch(signupStart({ data: authDetailsPayload }));

    const userDetailsPayload: UserDetails = {
      employeeId: signupData.value.employeeId,
      firstName: signupData.value.firstName,
      middleName: signupData.value.middleName,
      lastName: signupData.value.lastName,
      gender: signupData.value.gender,
      contactNumber: signupData.value.contactNumber,
      address: signupData.value.address,
      dateOfBirth: signupData.value.dateOfBirth,
      citizenshipNumber: signupData.value.citizenshipNumber,
      startDate: signupData.value.startDate,
      department: signupData.value.department,
      role: signupData.value.role,
      designation: signupData.value.designation,
    };
    this.store.dispatch(addUserStart({ data: userDetailsPayload }));
    this.signupForm.reset();
    this.router.navigate(['/hrms'])
  }
}

