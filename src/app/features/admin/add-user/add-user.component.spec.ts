import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UserDetails, leaveBalance } from 'src/app/shared/models/adduser.model';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { AddUserComponent } from './add-user.component';
import { AddUserService } from './services/add-user/add-user.service';
import { FormService } from './services/form/form.service';
import {
  addUserStart,
  addleaveBalance,
  signupStart,
} from './store/add-user.action';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let store: Store;
  let userData: UserDetails;
  let leaveBalance: leaveBalance;

  const formServiceMock = {
    createSignupForm: () => {
      return new FormGroup({
        [FORM_CONTROL_NAMES.EMPLOYEE_ID]: new FormControl('T1001'),
        [FORM_CONTROL_NAMES.FIRST_NAME]: new FormControl('Test'),
        [FORM_CONTROL_NAMES.MIDDLE_NAME]: new FormControl('the'),
        [FORM_CONTROL_NAMES.LAST_NAME]: new FormControl('User'),
        [FORM_CONTROL_NAMES.ADDRESS]: new FormControl('Kathmandu'),
        [FORM_CONTROL_NAMES.CITIZENSHIP_NUMBER]: new FormControl('123-22-33'),
        [FORM_CONTROL_NAMES.CONTACT_NUMBER]: new FormControl(9812345677),
        [FORM_CONTROL_NAMES.DATE_OF_BIRTH]: new FormControl('1990-11-12'),
        [FORM_CONTROL_NAMES.DEPARTMENT]: new FormControl('Angular'),
        [FORM_CONTROL_NAMES.DESIGNATION]: new FormControl('Intern'),
        [FORM_CONTROL_NAMES.GENDER]: new FormControl('Male'),
        [FORM_CONTROL_NAMES.ROLE]: new FormControl('User'),
        [FORM_CONTROL_NAMES.START_DATE]: new FormControl('2024-01-01'),
        [FORM_CONTROL_NAMES.EMAIL]: new FormControl('test@example.com'),
        password: new FormControl('', Validators.required),
      });
    },
    getUserSignupPayload: jasmine
      .createSpy('getUserSignupPayload')
      .and.returnValue({
        email: 'test@gmail.com',
        password: 'password',
        employeeId: 'T1001',
      }),
    getUserDetailsFromForm: jasmine
      .createSpy('getUserDetailsFromForm')
      .and.returnValue({
        employeeId: 'T1234',
        firstName: 'Test',
        middleName: 'the',
        lastName: 'User',
        gender: 'Male',
        contactNumber: 9812345677,
        address: 'Kathmandu',
        dateOfBirth: new Date('1990-11-12'),
        citizenshipNumber: '123-22-33',
        startDate: new Date('2024-01-01'),
        department: 'Angular',
        role: 'User',
        designation: 'Intern',
        email: 'test@gmail.com',
      }),
    getLeaveBalance: jasmine.createSpy('getLeaveBalance').and.returnValue({
      sickLeaveTotal: 18,
      annualLeaveTotal: 30,
      specialLeaveTaken: 0,
      sickLeaveRemaining: 18,
      annualLeaveRemaining: 30,
    }),
  };
  const addUserServiceMock = {
    emailAlreadyExistsStatus: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: FormService, useValue: formServiceMock },
        { provide: AddUserService, useValue: addUserServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    component.loadingSubscription = new Subscription();
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    userData = {
      employeeId: 'T1234',
      firstName: 'Test',
      middleName: 'the',
      lastName: 'User',
      gender: 'Male',
      contactNumber: 9812345677,
      address: 'Kathmandu',
      dateOfBirth: new Date('1990-11-12'),
      citizenshipNumber: '123-22-33',
      startDate: new Date('2024-01-01'),
      department: 'Angular',
      role: 'User',
      designation: 'Intern',
      email: 'test@gmail.com',
    };
    leaveBalance = {
      sickLeaveTotal: 18,
      annualLeaveTotal: 30,
      specialLeaveTaken: 0,
      sickLeaveRemaining: 18,
      annualLeaveRemaining: 30,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions when addUserDetail is called', () => {
    component.addUserDetail();
    expect(store.dispatch).toHaveBeenCalledWith(
      setLoadingSpinner({ status: true }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      signupStart({
        email: 'test@gmail.com',
        employeeId: 'T1001',
        password: 'password',
      }),
    );
  });

  it('should dispatch addUserStart and addleaveBalance actions when loading is false and emailExists is false', () => {
    spyOn(store, 'select').and.returnValue(of(false));
    component.loadingSubscription?.unsubscribe();
    component.emailExists = false;

    component.addUserDetail();
    expect(store.dispatch).toHaveBeenCalledWith(
      setLoadingSpinner({ status: true }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      signupStart({
        email: 'test@gmail.com',
        employeeId: 'T1001',
        password: 'password',
      }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      addUserStart({ data: userData }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      addleaveBalance({
        email: 'test@gmail.com',
        leaveBalance: leaveBalance,
      }),
    );
  });

  it('should reset signupForm when loading is false and emailExists is false', () => {
    spyOn(store, 'select').and.returnValue(of(false));
    spyOn(component.signupForm, 'reset');
    component.addUserDetail();
    expect(component.signupForm.reset).toHaveBeenCalled();
  });

  it('should not dispatch any action when loading is true', () => {
    spyOn(store, 'select').and.returnValue(of(true));
    component.addUserDetail();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should not dispatch any action when emailExists is true', () => {
    spyOn(store, 'select').and.returnValue(of(false));
    component.emailExists = true;
    component.addUserDetail();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe loadingSubscription on ngOnDestroy', () => {
    if (component.loadingSubscription) {
      spyOn(component.loadingSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.loadingSubscription.unsubscribe).toHaveBeenCalled();
    } else {
      fail('loadingSubscription is not defined');
    }
  });
});
