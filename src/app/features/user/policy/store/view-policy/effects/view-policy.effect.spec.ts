import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { ViewPolicyEffect } from './view-policy.effect';
import { getPolicyStart, getPolicySuccess } from '../view-policy.action';
import { GetPolicyService } from '../../../services/get-policy/get-policy.service';
import { cold, hot } from 'jasmine-marbles';
import { Policy } from '../../../models/policy.interface';
import { Action } from '@ngrx/store';

describe('ViewPolicyEffect', () => {
  let actions$: Observable<Action>;
  let effects: ViewPolicyEffect;
  let getPolicyService: jasmine.SpyObj<GetPolicyService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewPolicyEffect,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: GetPolicyService,
          useValue: jasmine.createSpyObj('GetPolicyService', [
            'getPolicyDetails',
          ]),
        },
      ],
    });

    effects = TestBed.inject(ViewPolicyEffect);
    getPolicyService = TestBed.inject(
      GetPolicyService,
    ) as jasmine.SpyObj<GetPolicyService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('viewPolicy$', () => {
    it('should return getPolicySuccess action', () => {
      const selectedPolicy = 'HR Policy';
      const policyData: Policy = {
        policyType: 'HR Policy',
        policyList: [],
        annualLeave: 20,
        sickLeave: 10,
      };
      getPolicyService.getPolicyDetails.and.returnValue(of(policyData));

      const action = getPolicyStart({ selectedPolicy });
      const completion = getPolicySuccess({ policy: policyData });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewPolicy$).toBeObservable(expected);
    });
  });
});
