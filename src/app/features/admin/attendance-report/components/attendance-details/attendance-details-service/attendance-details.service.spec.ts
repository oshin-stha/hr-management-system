import { TestBed } from '@angular/core/testing';

import { AttendanceDetailsService } from './attendance-details.service';

describe('AttendanceDetailsService', () => {
  let service: AttendanceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
