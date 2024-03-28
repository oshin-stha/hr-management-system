import { TestBed } from '@angular/core/testing';

import { LeaveFormService } from './leave-form.service';

xdescribe('LeaveFormService', () => {
  let service: LeaveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
