import { TestBed } from '@angular/core/testing';

import { UpdatePolicyService } from './update-policy.service';

describe('UpdatePolicyService', () => {
  let service: UpdatePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
