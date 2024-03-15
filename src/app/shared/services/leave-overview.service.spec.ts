import { TestBed } from '@angular/core/testing';

import { LeaveOverviewService } from './leave-overview.service';

describe('LeaveOverviewService', () => {
  let service: LeaveOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
