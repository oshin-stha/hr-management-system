import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceDetailsService } from '../../attendance-details-service/attendance-details.service';
import {
  loadAttendanceDetails,
  loadAttendanceDetailsFail,
  loadAttendanceDetailsSuccess,
  loadEmployeeNameFail,
  loademployeeName,
  loademployeeNameSuccess,
} from '../attendance-details.actions';
import { AttendanceDetails } from './attendance-details.effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('AttendanceDetailsEffects', () => {
  let actions$: Actions;
  let effects: AttendanceDetails;
  let attendanceDetailsServiceSpy: jasmine.SpyObj<AttendanceDetailsService>;
  let scheduler: TestScheduler;

  beforeEach(() => {
    const attendanceDetailsServiceSpyObj = jasmine.createSpyObj(
      'AttendanceDetailsService',
      [
        'getAttendanceDetailsByEmployeeId',
        'getEmployeeNameByEmployeeId',
        'attendanceOverviewRoute',
      ],
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AttendanceDetails,
        {
          provide: AttendanceDetailsService,
          useValue: attendanceDetailsServiceSpyObj,
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(AttendanceDetails);
    attendanceDetailsServiceSpy = TestBed.inject(
      AttendanceDetailsService,
    ) as jasmine.SpyObj<AttendanceDetailsService>;
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch loadAttendanceDetailsSuccess action on loadAttendanceDetails', () => {
    scheduler.run(({ hot, expectObservable }) => {
      const employeeId = 'AN1001';
      const attendanceList: AttendanceState[] = [];
      actions$ = hot('-a', { a: loadAttendanceDetails({ employeeId }) });
      const expected = '-b';
      const expectedValues = {
        b: loadAttendanceDetailsSuccess({ attendanceList }),
      };
      attendanceDetailsServiceSpy.getAttendanceDetailsByEmployeeId.and.returnValue(
        of(attendanceList),
      );

      expectObservable(effects.loadAttendanceDetails$).toBe(
        expected,
        expectedValues,
      );
    });
  });

  it('should dispatch loadAttendanceDetailsFail action on error in loadAttendanceDetails', () => {
    scheduler.run(({ hot, expectObservable }) => {
      const error = 'Test Error';
      const employeeId = 'AN1001';
      actions$ = hot('-a', { a: loadAttendanceDetails({ employeeId }) });
      const expected = '-b';
      const expectedValues = { b: loadAttendanceDetailsFail({ error }) };
      attendanceDetailsServiceSpy.getAttendanceDetailsByEmployeeId.and.returnValue(
        throwError(() => error),
      );

      expectObservable(effects.loadAttendanceDetails$).toBe(
        expected,
        expectedValues,
      );
    });
  });

  it('should dispatch loademployeeNameSuccess action on loadEmployeeName with valid employee name', () => {
    scheduler.run(({ hot, expectObservable }) => {
      const employeeName = 'Oshin Shrestha';
      const employeeId = 'AN1001';
      actions$ = hot('-a', { a: loademployeeName({ employeeId }) });
      const expected = '-b';
      const expectedValues = { b: loademployeeNameSuccess({ employeeName }) };
      attendanceDetailsServiceSpy.getEmployeeNameByEmployeeId.and.returnValue(
        of(employeeName),
      );

      expectObservable(effects.loademployeeName$).toBe(
        expected,
        expectedValues,
      );
    });
  });

  it('should dispatch loadEmployeeNameFail action on loadEmployee with empty employee name', () => {
    scheduler.run(({ hot, expectObservable }) => {
      const employeeId = 'AN1001';
      actions$ = hot('-a', { a: loademployeeName({ employeeId }) });
      const expected = '-b';
      const expectedValues = {
        b: loadEmployeeNameFail({ error: 'Empty Employee Name' }),
      };
      attendanceDetailsServiceSpy.getEmployeeNameByEmployeeId.and.returnValue(
        of(''),
      );

      expectObservable(effects.loademployeeName$).toBe(
        expected,
        expectedValues,
      );
    });
  });

  it('should call attendanceOverviewRoute on loadEmployeeNameFail', () => {
    scheduler.run(({ hot }) => {
      const error = 'Test Error';
      actions$ = hot('-a', { a: loadEmployeeNameFail({ error }) });
      attendanceDetailsServiceSpy.attendanceOverviewRoute.and.callThrough();

      effects.navigateToAttendanceOverview$.subscribe(() => {
        expect(
          attendanceDetailsServiceSpy.attendanceOverviewRoute,
        ).toHaveBeenCalled();
      });
    });
  });
});
