import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AttendanceReportService } from '../../attendance-overview-service/attendance-overview.service';
import {
  fetchTodaysAttendnaceData,
  fetchTodaysAttendnaceDataFail,
  fetchTodaysAttendnaceDataSuccess,
} from '../attendance-overview.actions';
import { TodaysAttendanceState } from '../attendance-overview.state';
import { AttendanceReport } from './attendance-overview.effects';

describe('AttendanceReport', () => {
  let actions$: Actions;
  let effects: AttendanceReport;
  let attendanceReportServiceSpy: jasmine.SpyObj<AttendanceReportService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    const spy = jasmine.createSpyObj('AttendanceReportService', [
      'getTodaysAttendanceWithUserDetails',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AttendanceReport,
        provideMockActions(() => actions$),
        { provide: AttendanceReportService, useValue: spy },
      ],
    });

    effects = TestBed.inject(AttendanceReport);
    attendanceReportServiceSpy = TestBed.inject(
      AttendanceReportService,
    ) as jasmine.SpyObj<AttendanceReportService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return fetchTodaysAttendnaceDataSuccess action on successful fetch', () => {
    const mockData: TodaysAttendanceState[] = [
      {
        attendance: {
          absent: null,
          checkInReason: 'I am late due to traffic',
          checkInStatus: 'Late-Arrival',
          checkInTime: new Date(),
          checkOutReason: '',
          checkOutStatus: 'Checked-Out',
          checkOutTime: new Date(),
          email: 'hr@gmail.com',
          workingHours: 4,
        },
        userNameEmployeeID: {
          employeeId: '123',
          firstName: 'John',
          middleName: '',
          lastName: 'Doe',
        },
      },
    ];

    const action = fetchTodaysAttendnaceData();
    const completion = fetchTodaysAttendnaceDataSuccess({
      todaysAttendance: mockData,
    });

    actions$ = cold('a', { a: action });

    attendanceReportServiceSpy.getTodaysAttendanceWithUserDetails.and.returnValue(
      of(mockData),
    );

    testScheduler.run(() => {
      effects.fetchTodaysAttendance$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });

  it('should return fetchTodaysAttendnaceDataFail action on error', () => {
    const errorMessage = 'Error occurred';

    const action = fetchTodaysAttendnaceData();
    const completion = fetchTodaysAttendnaceDataFail({ error: errorMessage });

    actions$ = cold('a', { a: action });

    attendanceReportServiceSpy.getTodaysAttendanceWithUserDetails.and.returnValue(
      throwError(() => errorMessage),
    );

    testScheduler.run(() => {
      effects.fetchTodaysAttendance$.subscribe((result) => {
        expect(result).toEqual(completion);
      });
    });
  });
});
