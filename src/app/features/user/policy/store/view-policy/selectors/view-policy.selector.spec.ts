import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  selectPolicy,
  selectisLoading,
  selectError,
} from './view-policy.selector';
import { initialViewPolicyState, ViewPolicyState } from '../view-policy.state';
import { Policy } from '../../../models/policy.interface';
import { viewPolicyReducer } from '../reducers/view-policy.reducer';
import { VIEW_POLICY_SELECTOR } from './view-policy.selector';

describe('View Policy Selectors', () => {
  let store: Store<{ [VIEW_POLICY_SELECTOR]: ViewPolicyState }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ [VIEW_POLICY_SELECTOR]: viewPolicyReducer }),
      ], // Importing StoreModule.forRoot({}) to set up the store in TestBed
    });
    store = TestBed.inject(Store);
  });

  it('should select policy', () => {
    let selectedPolicy: Policy = {
      policyType: '',
      policyList: [],
    };
    store.select(selectPolicy).subscribe((policy) => {
      selectedPolicy = policy;
    });
    expect(selectedPolicy).toEqual(initialViewPolicyState.policy);
  });

  it('should select isLoading', () => {
    let isLoading = false;
    store.select(selectisLoading).subscribe((status) => {
      isLoading = status;
    });
    expect(isLoading).toEqual(initialViewPolicyState.isLoading);
  });

  it('should select error', () => {
    let error = '';
    store.select(selectError).subscribe((errorMsg) => {
      error = errorMsg;
    });
    expect(error).toEqual(initialViewPolicyState.error);
  });
});
