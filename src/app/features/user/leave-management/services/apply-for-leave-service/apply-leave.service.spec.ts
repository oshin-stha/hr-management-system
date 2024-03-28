import { TestBed } from '@angular/core/testing';

import { ApplyLeaveService } from './apply-leave.service';

xdescribe('ApplyLeaveService', () => {
  let service: ApplyLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
