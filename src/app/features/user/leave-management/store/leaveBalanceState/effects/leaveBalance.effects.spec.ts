import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { LeaveBalanceDetails } from '../../../models/leaveBalanceDetails.interface';
import { LeaveBalanceService } from '../../../services/leave-balance-service/leave-balance.service';
import {
  getLeavebalanceFailure,
  getLeavebalanceStart,
  getLeavebalanceSuccess,
} from '../leaveBalance.action';
import { LeaveBalanceEffects } from './leaveBalance.effects';

xdescribe('LeaveBalanceEffects', () => {
  let actions$: Actions;
  let effects: LeaveBalanceEffects;
  let leaveBalanceServiceSpy: jasmine.SpyObj<LeaveBalanceService>;
  let testScheduler: TestScheduler;
  const mockLeaveBalance: LeaveBalanceDetails = {
    annualLeaveRemaining: 10,
    annualLeaveTotal: 20,
    sickLeaveRemaining: 5,
    sickLeaveTotal: 10,
    specialLeaveTaken: 2,
  };
  beforeEach(() => {
    const leaveBalanceService = jasmine.createSpyObj('LeaveBalanceService', [
      'getLeaveBalance',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LeaveBalanceEffects,
        provideMockActions(() => actions$),
        { provide: LeaveBalanceService, useValue: leaveBalanceService },
      ],
    });

    effects = TestBed.inject(LeaveBalanceEffects);
    leaveBalanceServiceSpy = TestBed.inject(
      LeaveBalanceService,
    ) as jasmine.SpyObj<LeaveBalanceService>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getLeaveBalance$', () => {
    it('should return getLeavebalanceSuccess action on success', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const action = getLeavebalanceStart({ email: 'test@example.com' });
        const completion = getLeavebalanceSuccess({
          leaveBalance: mockLeaveBalance,
        });

        actions$ = cold('--a', { a: action });
        const response = cold('--a|', { a: mockLeaveBalance });
        leaveBalanceServiceSpy.getLeaveBalance.and.returnValue(response);

        expectObservable(effects.getLeaveBalance$).toBe('--b', {
          b: completion,
        });
      });
    });

    it('should return getLeavebalanceFailure action on error', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const mockError = 'An error occurred';
        const action = getLeavebalanceStart({ email: 'test@example.com' });
        const completion = getLeavebalanceFailure({ error: mockError });

        actions$ = cold('--a', { a: action });
        const response = cold('--a|', { a: mockLeaveBalance });
        leaveBalanceServiceSpy.getLeaveBalance.and.returnValue(response);

        expectObservable(effects.getLeaveBalance$).toBe('--b', {
          b: completion,
        });
      });
    });
  });
});
