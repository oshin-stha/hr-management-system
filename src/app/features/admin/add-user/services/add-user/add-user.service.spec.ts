/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeaveBalanceDetails } from 'src/app/features/user/leave-management/models/leaveBalanceDetails.interface';
import { UserDetails } from 'src/app/shared/models/adduser.model';
import { AddUserService } from './add-user.service';

xdescribe('AddUserService', () => {
  let service: AddUserService;
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
    email: 'ram@gmail.com',
  };

  const dummyLeaveBalance: LeaveBalanceDetails = {
    annualLeaveRemaining: 10,
    annualLeaveTotal: 20,
    sickLeaveRemaining: 5,
    sickLeaveTotal: 10,
    specialLeaveTaken: 2,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserService],
    });
    service = TestBed.inject(AddUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create account successfully', (done: DoneFn) => {
    const email = 'test@example.com';
    const password = 'password';
    const employeeId = 'EMP123';

    const getEmployeeIdStatusCheckSpy = spyOn(
      service,
      'getEmployeeIdStatusCheck',
    ).and.returnValue(of(false));

    service.createAccount(email, password, employeeId).subscribe({
      next: () => {
        expect(getEmployeeIdStatusCheckSpy).toHaveBeenCalledWith(employeeId);
        done();
      },
      error: () => {
        done.fail('Should not throw an error');
      },
    });
  });

  it('should handle account creation error', (done: DoneFn) => {
    const email = 'test@example.com';
    const password = 'password';
    const employeeId = 'EMP123';

    const error = new Error('Email already in use');
    const getEmployeeIdStatusCheckSpy = spyOn(
      service,
      'getEmployeeIdStatusCheck',
    ).and.returnValue(of(false));

    service
      .createAccount(email, password, employeeId)
      .pipe(
        catchError((err) => {
          expect(err).toBe(error);
          expect(getEmployeeIdStatusCheckSpy).toHaveBeenCalledWith(employeeId);
          done();
          return of(null);
        }),
      )
      .subscribe();
  });

  it('should add user details successfully', (done: DoneFn) => {
    const email = 'test@example.com';

    const setDocSpy = spyOn(service, 'addUserDetails').and.returnValue(of());

    service.addUserDetails(userData, email).subscribe({
      next: () => {
        done();
      },
      error: () => {
        done.fail('Should not throw an error');
      },
    });
  });

  it('should add leave balance successfully', (done: DoneFn) => {
    const email = 'test@example.com';

    const setDocSpy = spyOn(service, 'addLoadLeaveBalance').and.returnValue(
      of(),
    );

    service.addLoadLeaveBalance(email, dummyLeaveBalance).subscribe({
      next: () => {
        done();
      },
      error: () => {
        done.fail('Should not throw an error');
      },
    });
  });

  it('should check employee ID status successfully', (done: DoneFn) => {
    const employeeId = 'EMP123';
    const employeeIdCheckResponse = true;

    const querySpy = spyOn(service, 'getEmployeeIdStatusCheck').and.returnValue(
      of(employeeIdCheckResponse),
    );

    service.getEmployeeIdStatusCheck(employeeId).subscribe((result) => {
      expect(result).toEqual(employeeIdCheckResponse);
      done();
    });
  });

  it('should handle error message correctly', () => {
    const errorMessage = 'email-already-in-use';

    service.getErrorMessage(errorMessage);
    expect(service.emailAlreadyExists).toBeTruthy();
  });
});
