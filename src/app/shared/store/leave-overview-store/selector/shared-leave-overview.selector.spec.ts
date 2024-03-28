import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Timestamp } from 'firebase/firestore';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import { UserDetails } from 'src/app/shared/models/user-details.model';
import { LeaveDetailsState } from '../shared-leave-overview.state';
import {
  getLeaveDetails,
  selectUserDetails,
} from './shared-leave-overview.selector';

describe('Selectors', () => {
  let store: MockStore;
  const initialState: LeaveDetailsState = {
    loading: false,
    userDetails: [
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
    ],
    leaveDetails: [
      {
        id: 'AN1001',
        employeeName: 'Ram Shrestha',
        department: 'Angular',
        contactInformation: 9812345678,
        leaveType: 'Annual',
        leaveFrom: new Timestamp(4, 20),
        leaveTo: new Timestamp(4, 20),
        reasonForLeave: 'sick',
        status: 'pending',
        totalLeaveDays: 2,
        email: 'ram@gmail.com',
        actionPerformed: true,
        fromDepartment: 'Angular',
        firstOrSecondHalf: 'First Half',
      },
    ],
    error: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('should select user details', () => {
    const userDetails: UserDetails[] = initialState.userDetails;
    store.overrideSelector(selectUserDetails, userDetails);

    let selectedUserDetails: UserDetails[] | undefined;
    store.select(selectUserDetails).subscribe((value) => {
      selectedUserDetails = value;
      expect(selectedUserDetails).toEqual(userDetails);
    });
  });

  it('should select leave details', () => {
    const leaveDetails: LeaveDetails[] = initialState.leaveDetails;
    store.overrideSelector(getLeaveDetails, leaveDetails);

    let selectedLeaveDetails: LeaveDetails[] | undefined;
    store.select(getLeaveDetails).subscribe((value) => {
      selectedLeaveDetails = value;
      expect(selectedLeaveDetails).toEqual(leaveDetails);
    });
  });
});
