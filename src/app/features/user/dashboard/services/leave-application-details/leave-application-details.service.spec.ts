import { TestBed } from '@angular/core/testing';

import { LeaveApplicationDetailsService } from './leave-application-details.service';

describe('LeaveApplicationDetailsService', () => {
  let service: LeaveApplicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveApplicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
