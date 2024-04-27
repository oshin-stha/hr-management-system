import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPolicyStart } from '../../store/view-policy/view-policy.action';
import { selectPolicy } from '../../store/view-policy/selectors/view-policy.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss'],
})
export class ViewPolicyComponent implements OnInit, OnDestroy {
  isHrDisabled = 'true';
  selectedButtonValue = 'HR Policy';
  policyTitle = 'HR Policy';
  policyList: string[] = [];
  sickLeave? = 0;
  annualLeave? = 0;
  selectPolicySubscriber: Subscription = new Subscription();
  activePolicy = 'HR Policy';
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

  getPolicyValue(value: string) {
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
