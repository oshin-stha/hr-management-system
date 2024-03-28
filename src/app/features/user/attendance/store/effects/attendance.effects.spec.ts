import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AttendanceService } from '../../attendance-service/attendance.service';
import {
  checkInFailure,
  checkInStart,
  checkInSuccess,
  checkOutFailure,
  checkOutStart,
  checkOutSuccess,
  fetchAttendanceDataStart,
  fetchAttendanceDataSuccess,
} from '../attendance.actions';
import { AttendanceEffects } from './attendance.effects';

class MatDialogMock {
  open() {
    return { afterClosed: () => of('Some reason') };
  }
}

xdescribe('CheckInEffects', () => {
  let actions$: Actions;
  let effects: AttendanceEffects;
  let localStorage: Storage;
  let AttendanceServiceSpy: jasmine.SpyObj<AttendanceService>;

  beforeEach(() => {
    const AttendanceServiceSpyObj = {
      addCheckIn: jasmine.createSpyObj('AttendanceService', ['addCheckIn']),
    };
    TestBed.configureTestingModule({
      providers: [
        AttendanceEffects,
        {
          provide: AttendanceService,
          useValue: AttendanceServiceSpyObj,
        },
        { provide: MatDialog, useClass: MatDialogMock },
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: Storage,
          useValue: {
            getItem: () => 'test@example.com',
          },
        },
      ],
    });

    effects = TestBed.inject(AttendanceEffects);
    localStorage = TestBed.inject(Storage);
    AttendanceServiceSpy = TestBed.inject(
      AttendanceService,
    ) as jasmine.SpyObj<AttendanceService>;
  });

  it('should dispatch checkInSuccess when isLateArrival is true and reason provided', () => {
    const action = checkInStart();
    const expected = checkInSuccess();
    actions$ = hot('-a', { a: action });
    const data = {
      checkInTime: new Date(),
      checkInStatus: 'Late-Arrival',
      checkInReason: 'Traffic',
    };
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    spyOn(MatDialogMock.prototype, 'open').and.returnValue({
      afterClosed: () => of('Traffic'),
    });
    spyOn(AttendanceServiceSpy, 'addCheckIn').and.returnValue(of(data));

    expect(effects.checkIn$).toBeObservable(cold('-b', { b: expected }));
  });

  it('should dispatch checkInFailure when isLateArrival is true and reason not provided', () => {
    const action = checkInStart();
    const expected = checkInFailure({
      error: 'No reason provided for being late',
    });
    actions$ = hot('-a', { a: action });
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    spyOn(MatDialogMock.prototype, 'open').and.returnValue({
      afterClosed: () => of(),
    });
    expect(effects.checkIn$).toBeObservable(cold('-b', { b: expected }));
  });

  it('should dispatch checkInSuccess when isLateArrival is false', () => {
    const action = checkInStart();
    const expected = checkInSuccess();
    actions$ = hot('-a', { a: action });
    const data = {
      checkInTime: new Date(),
      checkInStatus: 'Checked-In',
      checkInReason: null,
    };
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    spyOn(AttendanceServiceSpy, 'addCheckIn').and.returnValue(of(data));

    expect(effects.checkIn$).toBeObservable(cold('-b', { b: expected }));
  });

  it('should dispatch checkOutSuccess action on successful check-out', () => {
    const action = checkOutStart({ checkInTime: new Date() });
    const expected = cold('(a|)', { a: checkOutSuccess() });

    actions$ = hot('-a', { a: action });

    expect(effects.checkOut$).toBeObservable(expected);
  });

  it('should dispatch checkOutFailure action when no reason provided for early departure', () => {
    const action = checkOutStart({ checkInTime: new Date() });
    const expected = cold('(a|)', {
      a: checkOutFailure({ error: 'No reason provided for early departure' }),
    });

    spyOn(localStorage, 'getItem').and.returnValue('test@email.com');
    spyOn(MatDialogMock.prototype, 'open').and.returnValue({
      afterClosed: () => of(),
    });

    actions$ = hot('-a', { a: action });

    expect(effects.checkOut$).toBeObservable(expected);
  });

  it('should dispatch fetchAttendanceData action when checkInSuccess or checkOutSuccess action is dispatched', () => {
    const action = checkInSuccess();
    const expected = cold('(a|)', { a: fetchAttendanceDataStart() });

    actions$ = hot('-a', { a: action });

    expect(effects.refetchData$).toBeObservable(expected);
  });

  it('should dispatch fetchAttendanceDataSuccess action on successful fetchAttendanceData', () => {
    const action = fetchAttendanceDataStart();
    const expected = cold('(a|)', {
      a: fetchAttendanceDataSuccess({ attendanceList: [] }),
    });

    actions$ = hot('-a', { a: action });

    expect(effects.fetchAttendanceData$).toBeObservable(expected);
  });
});
