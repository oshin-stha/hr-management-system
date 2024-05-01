import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ViewPolicyComponent } from './view-policy.component';
import { getPolicyStart } from '../../store/view-policy/view-policy.action';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';

describe('ViewPolicyComponent', () => {
  let component: ViewPolicyComponent;
  let fixture: ComponentFixture<ViewPolicyComponent>;
  let store: MockStore<Store>;

  const initialState = {
    viewPolicy: {
      policyType: 'HR Policy',
      policyList: ['HR Policy', 'Company Policy', 'Leave Policy'],
      annualLeave: 0,
      sickLeave: 0,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPolicyComponent],
      imports: [MatCardModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ViewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load policy details on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      getPolicyStart({ selectedPolicy: 'HR Policy' }),
    );
    expect(component.policyTitle).toEqual(initialState.viewPolicy.policyType);
    expect(component.annualLeave).toEqual(initialState.viewPolicy.annualLeave);
    expect(component.sickLeave).toEqual(initialState.viewPolicy.sickLeave);
  });

  it('should update policy details when getPolicyValue is called', () => {
    const mockPolicyResponse = {
      policyType: 'Company Policy',
      policyList: ['Company Policy', 'HR Policy', 'Leave Policy'],
      annualLeave: 0,
      sickLeave: 0,
    };

    spyOn(store, 'select').and.returnValue(of(mockPolicyResponse));

    component.getPolicyValue('Company Policy');

    expect(store.dispatch).toHaveBeenCalledWith(
      getPolicyStart({ selectedPolicy: 'Company Policy' }),
    );
    expect(component.policyTitle).toEqual(mockPolicyResponse.policyType);
    expect(component.annualLeave).toEqual(mockPolicyResponse.annualLeave);
    expect(component.sickLeave).toEqual(mockPolicyResponse.sickLeave);
  });
});
