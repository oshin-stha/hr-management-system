import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { GetPolicyService } from './get-policy.service';
import { Policy } from '../../models/policy.interface';
import { of } from 'rxjs';

describe('GetPolicyService', () => {
  let service: GetPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPolicyService],
    });
    service = TestBed.inject(GetPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of Policy with correct policy type', fakeAsync(() => {
    const policyType = 'Leave Policy';
    const expectedPolicy: Policy = {
      policyType: 'Leave Policy',
      policyList: ['policy list'],
      sickLeave: 10,
      annualLeave: 20,
    };

    spyOn(service, 'getPolicyDetails').and.returnValue(of(expectedPolicy));

    let resultPolicy: Policy | undefined;
    service.getPolicyDetails(policyType).subscribe((policy: Policy) => {
      resultPolicy = policy;
    });

    tick();

    expect(service.getPolicyDetails).toHaveBeenCalledWith(policyType);
    flush();
    expect(resultPolicy?.policyType).toEqual(policyType);
  }));
});
