import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LeaveBalanceState } from '../../../models/leaveBalanceState.model';
import {
  getLeaveBalance,
  getError,
  LEAVE_BALANCE_SELECTOR,
} from './leaveBalance.selector';
import { initialLeaveBalanceState } from '../leaveBalance.state';

describe('Selectors', () => {
  let store: MockStore<LeaveBalanceState>;
  const mockLeaveBalance = {
    leaveBalance: {
      annualLeaveRemaining: 0,
      annualLeaveTotal: 0,
      sickLeaveRemaining: 0,
      sickLeaveTotal: 0,
      specialLeaveTaken: 0,
    },
    error: '',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState: {
            [LEAVE_BALANCE_SELECTOR]: initialLeaveBalanceState,
          },
        }),
      ],
    });
    store = TestBed.inject(Store) as MockStore<LeaveBalanceState>;
  });

  it('should select the leave balance from the state', () => {
    let result;
    store.select(getLeaveBalance).subscribe((value) => {
      result = value;
      expect(result).toEqual(mockLeaveBalance?.leaveBalance);
    });
  });

  it('should select the error from the state', () => {
    let result;
    store.select(getError).subscribe((value) => {
      result = value;
      expect(result).toEqual(mockLeaveBalance.error);
    });
  });
});
