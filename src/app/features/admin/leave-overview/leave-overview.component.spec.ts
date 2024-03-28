import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Timestamp } from 'firebase/firestore';
import { of } from 'rxjs';
import { LeaveOverviewComponent } from './leave-overview.component';
import {
  acceptLeaveRequest,
  rejectLeaveRequest,
} from './store/leave-overview.action';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LeaveOverviewComponent', () => {
  let component: LeaveOverviewComponent;
  let fixture: ComponentFixture<LeaveOverviewComponent>;
  let store: MockStore;

  const initialState = {
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
        leaveFrom: new Timestamp(4, 40),
        leaveTo: new Timestamp(4, 40),
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
      declarations: [LeaveOverviewComponent],
      imports: [
        StoreModule.forRoot({}),
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LeaveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load leave details on init', () => {
    const getLeaveDetailsSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(getLeaveDetailsSpy).toHaveBeenCalledWith({
      type: '[LeaveDetails] Load LeaveDetails',
    });
  });

  it('should load leave details and user details on init', () => {
    const getLeaveDetailsSpy = spyOn(store, 'dispatch');
    const selectSpy = spyOn(store, 'select');
    selectSpy
      .withArgs('userDetails')
      .and.returnValue(of(initialState.userDetails));
    selectSpy
      .withArgs('leaveDetails')
      .and.returnValue(of(initialState.leaveDetails));
    component.ngOnInit();
    expect(getLeaveDetailsSpy).toHaveBeenCalledOnceWith({
      type: '[LeaveDetails] Load LeaveDetails',
    });
  });

  it('should handle acceptLeave method', () => {
    const acceptLeaveRequestSpy = spyOn(store, 'dispatch');
    component.acceptLeave('AN1001', 2, 'ram@gmail.com', 'Annual');
    expect(acceptLeaveRequestSpy).toHaveBeenCalledWith(
      acceptLeaveRequest({ id: 'AN1001' }),
    );
  });

  it('should handle rejectLeave method', () => {
    const rejectLeaveRequestSpy = spyOn(store, 'dispatch');
    component.rejectLeave('AN1001');
    expect(rejectLeaveRequestSpy).toHaveBeenCalledWith(
      rejectLeaveRequest({ id: 'AN1001' }),
    );
  });

  it('should update data source on updateDataSource method', () => {
    component.leaveDetails = initialState.leaveDetails;
    component.userDetails = initialState.userDetails;
    component.updateDataSource();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should handle ngOnDestroy method', () => {
    const resetLeaveOverviewSpy = spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(resetLeaveOverviewSpy).toHaveBeenCalledOnceWith({
      type: '[Reset LeaveOverview] Reset Leave Overview',
    });
  });
  it('should apply leave type filter correctly', () => {
    component.selectedLeaveType = 'Annual';
    component.applyLeaveTypeFilter();
    expect(component.dataSource.filter).toBe('annual');
  });

  it('should apply date filter correctly', () => {
    component.selectedDateFilter = 'today';
    component.filterTodayLeaveDetails();
    expect(component.filteredLeaves.length).toBeGreaterThanOrEqual(0);
  });
  it('should format timestamp correctly', () => {
    const timestamp = { seconds: 1616995200, nanoseconds: 0 };
    const formattedDate = component.formatDate(timestamp);
    expect(formattedDate).toBe('3/29/2021, 11:05:00 AM');
  });

  it('should filter today leave details correctly', () => {
    component.selectedDateFilter = 'today';
    component.filterTodayLeaveDetails();
    const today = new Date();
    const filteredLeaves = component.leaveDetails.filter((leave) => {
      const leaveDate = leave.leaveFrom.toDate();
      return (
        leaveDate.getFullYear() === today.getFullYear() &&
        leaveDate.getMonth() === today.getMonth() &&
        leaveDate.getDate() === today.getDate()
      );
    });

    expect(component.filteredLeaves).toEqual(filteredLeaves);
  });

  it('should filter tomorrow leave details correctly', () => {
    component.selectedDateFilter = 'tomorrow';
    component.filterTommorowLeaveDetails();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const filteredLeaves = component.leaveDetails.filter((leave) => {
      const leaveDate = leave.leaveFrom.toDate();
      return (
        leaveDate.getFullYear() === tomorrow.getFullYear() &&
        leaveDate.getMonth() === tomorrow.getMonth() &&
        leaveDate.getDate() === tomorrow.getDate()
      );
    });

    expect(component.filteredLeaves).toEqual(filteredLeaves);
  });
});
