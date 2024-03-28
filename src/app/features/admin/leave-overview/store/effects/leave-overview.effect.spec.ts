import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import {
  acceptLeaveRequest,
  acceptLeaveRequestSuccess,
  rejectLeaveRequest,
  rejectLeaveRequestSuccess,
  updateLeaveBalance,
  updateLeaveBalanceSuccess,
  updateLeaveStatus,
  updateLeaveStatusSuccess,
} from '../leave-overview.action';
import { LeaveOverviewEffects } from './leave-overview.effect';
import { LeaveOverviewService } from '../../services/leave-overview.service';

describe('LeaveOverviewEffects', () => {
  let actions$: Observable<Action>;
  let effects: LeaveOverviewEffects;
  let leaveOverviewService: jasmine.SpyObj<any>;

  beforeEach(() => {
    leaveOverviewService = jasmine.createSpyObj('LeaveOverviewService', [
      'updateLeaveStatus',
      'acceptLeaveRequest',
      'rejectLeaveRequest',
      'updateLeaveBalance',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LeaveOverviewEffects,
        provideMockActions(() => actions$),
        { provide: LeaveOverviewService, useValue: leaveOverviewService },
      ],
    });
    effects = TestBed.inject(LeaveOverviewEffects);
  });

  it('should dispatch updateLeaveStatusSuccess action', () => {
    const id = '123';
    const newStatus = 'approved';
    const action = updateLeaveStatus({ id, newStatus });
    const completion = updateLeaveStatusSuccess({ id, newStatus });

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    leaveOverviewService.updateLeaveStatus.and.returnValue(of({}));
    expect(effects.updateLeaveStatus$).toBeObservable(expected);
  });

  it('should dispatch acceptLeaveRequestSuccess action', () => {
    const id = '123';
    const action = acceptLeaveRequest({ id });
    const completion = acceptLeaveRequestSuccess({ id });

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    leaveOverviewService.acceptLeaveRequest.and.returnValue(of({}));
    expect(effects.acceptLeaveRequest$).toBeObservable(expected);
  });

  it('should dispatch rejectLeaveRequestSuccess action', () => {
    const id = '123';
    const action = rejectLeaveRequest({ id });
    const completion = rejectLeaveRequestSuccess({ id });

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    leaveOverviewService.rejectLeaveRequest.and.returnValue(of({}));
    expect(effects.rejectLeaveRequest$).toBeObservable(expected);
  });

  it('should dispatch updateLeaveBalanceSuccess action', () => {
    const email = 'test@gmail.com';
    const totalLeaveDays = 5;
    const leaveType = 'Annual';
    const action = updateLeaveBalance({ email, totalLeaveDays, leaveType });
    const completion = updateLeaveBalanceSuccess();

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    leaveOverviewService.updateLeaveBalance.and.returnValue(
      of({ success: true }),
    );
    expect(effects.updateLeaveBalance$).toBeObservable(expected);
  });
});
