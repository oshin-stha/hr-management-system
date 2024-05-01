import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPolicyStart } from '../../store/view-policy/view-policy.action';
import { selectPolicy } from '../../store/view-policy/selectors/view-policy.selector';
import { Subscription } from 'rxjs';
import { POLICY_CONSTANTS } from 'src/app/shared/constants/policy.constants';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss'],
})
export class ViewPolicyComponent implements OnInit, OnDestroy {
  selectedButtonValue: string = 'HR Policy';
  policyTitle: string = 'HR Policy';
  policyList: string[] = [];
  sickLeave?: number = 0;
  annualLeave?: number = 0;
  selectPolicySubscriber: Subscription = new Subscription();
  activePolicy: string = 'HR Policy';
  POLICY_CONSTANTS = POLICY_CONSTANTS;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadPolicyDetails();
  }
  ngOnDestroy(): void {
    this.selectPolicySubscriber.unsubscribe();
  }

  loadPolicyDetails(): void {
    this.store.select(selectPolicy).subscribe((res) => {
      this.policyTitle = res.policyType;
      this.policyList = res.policyList;
      this.annualLeave = res.annualLeave;
      this.sickLeave = res.sickLeave;
    });
    this.store.dispatch(
      getPolicyStart({ selectedPolicy: this.selectedButtonValue }),
    );
  }

  getPolicyValue(value: string): void {
    this.selectedButtonValue = value;
    this.loadPolicyDetails();
    this.setActive(this.selectedButtonValue);
  }

  checkActive(value: string): boolean {
    if (this.activePolicy === value) {
      return true;
    }
    return false;
  }

  setActive(currentValue: string): void {
    this.activePolicy = currentValue;
  }
}
