import { TestBed } from '@angular/core/testing';
import { LeaveOverviewService } from './shared-leave-overview.service';

import { of } from 'rxjs';
import { UserDetails } from '../models/adduser.model';
import { LeaveDetails } from '../models/leave-overview.model';
import { Timestamp } from 'firebase/firestore';

describe('LeaveOverviewService', () => {
  let service: LeaveOverviewService;
  let mockLeaveDetails: LeaveDetails[];
  let mockUserDetails: UserDetails[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveOverviewService],
    });
    service = TestBed.inject(LeaveOverviewService);
    mockLeaveDetails = [
      {
        id: 'AN1001',
        employeeName: 'Ram Shrestha',
        department: 'Angular',
        contactInformation: 9812345678,
        leaveType: 'Annual',
        leaveFrom: new Timestamp(4, 40),
        leaveTo: new Timestamp(4, 40),
        reasonForLeave: 'Sick',
        status: 'pending',
        totalLeaveDays: 2,
        email: 'ram@gmail.com',
        actionPerformed: true,
        fromDepartment: 'Angular',
        firstOrSecondHalf: 'First Half',
      },
    ];
    mockUserDetails = [
      {
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
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch leave details', () => {
    spyOn(service, 'getLeaveDetails').and.returnValue(of(mockLeaveDetails));

    service.getLeaveDetails().subscribe((leaveDetails: LeaveDetails[]) => {
      expect(leaveDetails).toEqual(mockLeaveDetails);
    });
  });

  it('should fetch user details', () => {
    spyOn(service, 'getUserDetails').and.returnValue(of(mockUserDetails));
    service.getUserDetails().subscribe((userDetails: UserDetails[]) => {
      expect(userDetails).toEqual(mockUserDetails);
    });
  });
});
