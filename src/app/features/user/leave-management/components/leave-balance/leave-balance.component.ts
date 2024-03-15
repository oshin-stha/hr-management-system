import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLeavebalanceStart } from '../../store/leaveBalanceState/leaveBalance.action';
import { getLeaveBalance } from '../../store/leaveBalanceState/leaveBalance.selector';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.scss'],
})
export class LeaveBalanceComponent implements OnInit {
  userEmail: string | null = '';
  totalLeave: number | undefined;
  leaveAvailable: number | undefined;
  leaveTaken: number | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('Email');
    this.startGetLeaveBalance();
    this.getLeaveBalance();
  }

  startGetLeaveBalance(): void {
    if (this.userEmail) {
      this.store.dispatch(getLeavebalanceStart({ email: this.userEmail }));
    }
  }

  getLeaveBalance(): void {
    this.store.select(getLeaveBalance).subscribe((res) => {
      console.log(res, 'Leavebalance');
      this.totalLeave = res.totalLeave;
      this.leaveAvailable = res.leaveAvailable;
      this.leaveTaken = res.totalLeave - res.leaveAvailable;
    });
  }
}
