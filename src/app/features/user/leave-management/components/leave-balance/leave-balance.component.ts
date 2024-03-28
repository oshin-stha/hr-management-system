import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getLeavebalanceReset,
  getLeavebalanceStart,
} from '../../store/leaveBalanceState/leaveBalance.action';
import { getLeaveBalance } from '../../store/leaveBalanceState/selector/leaveBalance.selector';
import { LEAVE_BALANCE_CONSTANTS } from 'src/app/shared/constants/leaveDetails.constants';
import { EMAIL } from 'src/app/shared/constants/email.constant';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.scss'],
})
export class LeaveBalanceComponent implements OnInit, OnDestroy {
  userEmail: string | null = '';
  annualLeaveRemaining: number | undefined;
  annualLeaveTotal: number | undefined;
  sickLeaveRemaining: number | undefined;
  sickLeaveTotal: number | undefined;
  specialLeaveTaken: number | undefined;
  leaveTaken: number | undefined;
  LEAVE_BALANCE_CONSTANTS = LEAVE_BALANCE_CONSTANTS;
  getLeavebalanceSubscriber: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.userEmail = localStorage.getItem(EMAIL);
    this.getLeaveBalance();
  }
  ngOnDestroy(): void {
    this.getLeavebalanceSubscriber.unsubscribe();
    this.store.dispatch(getLeavebalanceReset());
  }

  startGetLeaveBalance(): void {
    if (this.userEmail) {
      this.store.dispatch(getLeavebalanceStart({ email: this.userEmail }));
    }
  }

  getLeaveBalance(): void {
    this.getLeavebalanceSubscriber = this.store
      .select(getLeaveBalance)
      .subscribe((res) => {
        this.annualLeaveTotal = res.annualLeaveTotal;
        this.annualLeaveRemaining = res.annualLeaveRemaining;
        this.sickLeaveTotal = res.sickLeaveTotal;
        this.sickLeaveRemaining = res.sickLeaveRemaining;
        this.specialLeaveTaken = res.specialLeaveTaken;
      });
    this.startGetLeaveBalance();
  }
}
