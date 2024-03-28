import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { AddUserService } from '../../services/add-user/add-user.service';
import {
  addUserFail,
  addUserStart,
  addUserSuccess,
  addleaveBalance,
  addleaveBalanceFail,
  addleaveBalanceSuccess,
  signupFail,
  signupStart,
  signupSuccess,
} from '../add-user.action';
import { AddUserEffect } from './add-user.effect';
import { LeaveBalanceDetails } from 'src/app/features/user/leave-management/models/leaveBalanceDetails.interface';
import { UserDetails } from 'src/app/shared/models/adduser.model';
import { provideMockStore } from '@ngrx/store/testing';

xdescribe('AddUserEffect', () => {
  let actions$: Observable<Action>;
  let effects: AddUserEffect;
  let addUserService: jasmine.SpyObj<AddUserService>;
  const userData: UserDetails = {
    employeeId: 'AN1001',
    firstName: 'Ram',
    middleName: 'Krishna',
    lastName: 'Shrestha',
    gender: 'Male',
    contactNumber: 9876543256,
    address: 'Kathmandu',
    dateOfBirth: new Date('2000-01-02'),
    citizenshipNumber: '34-43-345',
    startDate: new Date('2000-01-02'),
    department: 'Angular',
    role: 'User',
    designation: 'Intern',
    email: 'test@gmail.com',
  };
  const dummyLeaveBalance: LeaveBalanceDetails = {
    annualLeaveRemaining: 10,
    annualLeaveTotal: 20,
    sickLeaveRemaining: 5,
    sickLeaveTotal: 10,
    specialLeaveTaken: 2,
  };
  const error = { error: 'some_error_code' };
  beforeEach(() => {
    const addUserServiceSpy = jasmine.createSpyObj('AddUserService', [
      'createAccount',
      'addUserDetails',
      'addLoadLeaveBalance',
      'getErrorMessage',
    ]);
    addUserServiceSpy.createAccount.and.returnValue(of());
    TestBed.configureTestingModule({
      providers: [
        AddUserEffect,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: AddUserService, useValue: addUserServiceSpy },
      ],
    });

    effects = TestBed.inject(AddUserEffect);
    addUserService = TestBed.inject(
      AddUserService,
    ) as jasmine.SpyObj<AddUserService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('signup$', () => {
    it('should dispatch signupSuccess action when signupStart action is triggered', () => {
      const email = 'test@example.com';
      const password = 'password';
      const employeeId = '123';
      const action = signupStart({ email, password, employeeId });
      const completion = signupSuccess();

      actions$ = hot('-a>', { a: action });
      const response = cold('-|');
      addUserService.createAccount.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.signup$).toBeObservable(expected);
    });
    it('should dispatch signupFail action when signupStart action is triggered and service throws error', () => {
      const email = 'test@example.com';
      const password = 'password';
      const employeeId = '123';
      const action = signupStart({ email, password, employeeId });
      const completion = signupFail({ error: 'some_error_code' });
      addUserService.createAccount.and.returnValue(throwError(() => error));
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.signup$).toBeObservable(expected);
    });
  });

  describe('addUser$', () => {
    it('should dispatch addUserSuccess action with redirect true when addUserStart action is triggered', () => {
      const action = addUserStart({ data: userData });
      const completion = addUserSuccess({ redirect: true });
      addUserService.addUserDetails.and.returnValue(of());
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.addUser$).toBeObservable(expected);
    });

    it('should dispatch addUserFail action when addUserStart action is triggered and service throws error', () => {
      const action = addUserStart({ data: userData });
      const errorResponse = { error: 'some_error_code' };
      const completion = addUserFail({ error: 'some_error_code' });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, errorResponse);
      addUserService.addUserDetails.and.returnValue(response);

      const expected = cold('-b', { b: completion });
      expect(effects.addUser$).toBeObservable(expected);
    });
  });

  describe('addLeaveBalance$', () => {
    it('should dispatch addleaveBalanceSuccess action when addleaveBalance action is triggered', () => {
      const email = 'test@example.com';
      const action = addleaveBalance({
        email,
        leaveBalance: dummyLeaveBalance,
      });
      const completion = addleaveBalanceSuccess();
      addUserService.addLoadLeaveBalance.and.returnValue(of());

      actions$ = hot('-a', { a: action });
      const expected = cold('-b|', { b: completion });

      expect(effects.addLeaveBalance$).toBeObservable(expected);
    });

    it('should dispatch addleaveBalanceFail action when addleaveBalance action is triggered and service throws error', () => {
      const email = 'test@example.com';
      const action = addleaveBalance({
        email,
        leaveBalance: dummyLeaveBalance,
      });
      const completion = addleaveBalanceFail({ error: error.error });
      addUserService.addLoadLeaveBalance.and.returnValue(
        throwError(() => error.error),
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.addLeaveBalance$).toBeObservable(expected);
    });
  });
});
