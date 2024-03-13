import { TestBed } from '@angular/core/testing';

import { LeaveStatusService } from './leave-status.service';

describe('LeaveStatusService', () => {
  let service: LeaveStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
