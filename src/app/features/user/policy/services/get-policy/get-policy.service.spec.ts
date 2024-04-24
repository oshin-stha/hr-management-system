import { TestBed } from '@angular/core/testing';

import { GetPolicyService } from './get-policy.service';

describe('GetPolicyService', () => {
  let service: GetPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
