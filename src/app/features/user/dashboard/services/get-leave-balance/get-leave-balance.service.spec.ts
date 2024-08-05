import { TestBed } from '@angular/core/testing';

import { GetLeaveBalanceService } from './get-leave-balance.service';

describe('GetLeaveBalanceService', () => {
  let service: GetLeaveBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLeaveBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
