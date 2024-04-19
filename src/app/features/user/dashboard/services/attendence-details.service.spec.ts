import { TestBed } from '@angular/core/testing';

import { AttendenceDetailsService } from './attendence-details.service';

describe('AttendenceDetailsService', () => {
  let service: AttendenceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendenceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
