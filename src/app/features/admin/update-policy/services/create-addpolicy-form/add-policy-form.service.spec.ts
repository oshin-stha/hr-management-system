import { TestBed } from '@angular/core/testing';

import { AddPolicyFormService } from './add-policy-form.service';

describe('AddPolicyFormService', () => {
  let service: AddPolicyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPolicyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
