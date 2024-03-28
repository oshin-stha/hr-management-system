import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { provideMockStore } from '@ngrx/store/testing';
const MOCK_FORM_CONTROL_NAMES = {
  ...FORM_CONTROL_NAMES,
  EMPLOYEE_ID: 'employeeId',
  FIRST_NAME: 'firstName',
  MIDDLE_NAME: 'middleName',
  LAST_NAME: 'lastName',
  GENDER: 'gender',
  CONTACT_NUMBER: 'contactNumber',
  ADDRESS: 'address',
  DATE_OF_BIRTH: 'dateOfBirth',
  CITIZENSHIP_NUMBER: 'citizenshipNumber',
  START_DATE: 'startDate',
  DEPARTMENT: 'department',
  ROLE: 'role',
  DESIGNATION: 'designation',
  EMAIL: 'email',
  PASSWORD: 'password',
};
describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService, [provideMockStore()]],
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createSignupForm', () => {
    it('should create a FormGroup with all form controls', () => {
      const form = service.createSignupForm();
      expect(form instanceof FormGroup).toBe(true);
      const expectedFormControls = Object.values(
        MOCK_FORM_CONTROL_NAMES,
      ).filter(
        (control) =>
          ![
            'leaveFrom',
            'leaveTo',
            'totalLeaveDays',
            'leaveType',
            'reasonForLeave',
            'halfOrFullLeave',
            'firstOrSecondHalf',
            'fullDay',
            'halfDay',
          ].includes(control),
      );
      expect(Object.keys(form.controls)).toEqual(expectedFormControls);
    });
  });

  describe('getUserSignupPayload', () => {
    it('should return user signup payload if form is valid', () => {
      const form = new FormGroup({
        [FORM_CONTROL_NAMES.EMPLOYEE_ID]: new FormControl('123'),
        [FORM_CONTROL_NAMES.FIRST_NAME]: new FormControl('Ram'),
        [FORM_CONTROL_NAMES.MIDDLE_NAME]: new FormControl('Kumar'),
        [FORM_CONTROL_NAMES.LAST_NAME]: new FormControl('Shrestha'),
        [FORM_CONTROL_NAMES.ADDRESS]: new FormControl('Kathmandu'),
        [FORM_CONTROL_NAMES.GENDER]: new FormControl('Male'),
        [FORM_CONTROL_NAMES.CONTACT_NUMBER]: new FormControl('9812345678'),
        [FORM_CONTROL_NAMES.DATE_OF_BIRTH]: new FormControl('2002-11-2'),
        [FORM_CONTROL_NAMES.CITIZENSHIP_NUMBER]: new FormControl('123-324-324'),
        [FORM_CONTROL_NAMES.DEPARTMENT]: new FormControl('Angular'),
        [FORM_CONTROL_NAMES.ROLE]: new FormControl('User'),
        [FORM_CONTROL_NAMES.DESIGNATION]: new FormControl('Intern'),
        [FORM_CONTROL_NAMES.EMAIL]: new FormControl('ram@gmail.com'),
        [FORM_CONTROL_NAMES.PASSWORD]: new FormControl('password123'),
      });
      const payload = service.getUserSignupPayload(form);
      expect(payload).toEqual({
        email: 'ram@gmail.com',
        password: 'password123',
        employeeId: '123',
      });
    });

    it('should return null if form is invalid', () => {
      const form = new FormGroup({
        [FORM_CONTROL_NAMES.EMPLOYEE_ID]: new FormControl(
          '',
          Validators.required,
        ),
      });
      const payload = service.getUserSignupPayload(form);
      expect(payload).toBeNull();
    });
  });
});
