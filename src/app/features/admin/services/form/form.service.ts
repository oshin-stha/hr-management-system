import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from '../../models/adduser.model';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  createSignupForm(): FormGroup {
    return new FormGroup({
      [FORM_CONTROL_NAMES.EMPLOYEE_ID]: new FormControl(
        '',
        Validators.required,
      ),
      [FORM_CONTROL_NAMES.FIRST_NAME]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.MIDDLE_NAME]: new FormControl(''),
      [FORM_CONTROL_NAMES.LAST_NAME]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.GENDER]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.CONTACT_NUMBER]: new FormControl(
        '',
        Validators.required,
      ),
      [FORM_CONTROL_NAMES.ADDRESS]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.DATE_OF_BIRTH]: new FormControl(
        '',
        Validators.required,
      ),
      [FORM_CONTROL_NAMES.CITIZENSHIP_NUMBER]: new FormControl(
        '',
        Validators.required,
      ),
      [FORM_CONTROL_NAMES.START_DATE]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.DEPARTMENT]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.ROLE]: new FormControl('', Validators.required),
      [FORM_CONTROL_NAMES.DESIGNATION]: new FormControl(
        '',
        Validators.required,
      ),
      [FORM_CONTROL_NAMES.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [FORM_CONTROL_NAMES.PASSWORD]: new FormControl('', Validators.required),
    });
  }

  getUserDetailsFromForm(form: FormGroup): UserDetails | null {
    if (form.valid) {
      const data = form.value;
      return {
        employeeId: data[FORM_CONTROL_NAMES.EMPLOYEE_ID],
        firstName: data[FORM_CONTROL_NAMES.FIRST_NAME],
        middleName: data[FORM_CONTROL_NAMES.MIDDLE_NAME],
        lastName: data[FORM_CONTROL_NAMES.LAST_NAME],
        gender: data[FORM_CONTROL_NAMES.GENDER],
        contactNumber: data[FORM_CONTROL_NAMES.CONTACT_NUMBER],
        address: data[FORM_CONTROL_NAMES.ADDRESS],
        dateOfBirth: data[FORM_CONTROL_NAMES.DATE_OF_BIRTH],
        citizenshipNumber: data[FORM_CONTROL_NAMES.CITIZENSHIP_NUMBER],
        startDate: data[FORM_CONTROL_NAMES.START_DATE],
        department: data[FORM_CONTROL_NAMES.DEPARTMENT],
        role: data[FORM_CONTROL_NAMES.ROLE],
        designation: data[FORM_CONTROL_NAMES.DESIGNATION],
        email: data[FORM_CONTROL_NAMES.EMAIL],
        password: data[FORM_CONTROL_NAMES.PASSWORD],
      };
    } else {
      return null;
    }
  }
}
