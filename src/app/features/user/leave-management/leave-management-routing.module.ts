import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveManagementComponent } from './leave-management.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import LeaveStatusComponent from './components/leave-status/leave-status.component';
import {
  EMPTY_PATH,
  LEAVE_APPLY_PATH,
  LEAVE_STATUS_PATH,
} from 'src/app/shared/constants/routes.constants';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';

const routes: Routes = [
  {
    path: EMPTY_PATH,
    component: LeaveManagementComponent,
    children: [
      { path: EMPTY_PATH, component: LeaveBalanceComponent },
      { path: LEAVE_APPLY_PATH, component: LeaveApplyComponent },
      { path: LEAVE_STATUS_PATH, component: LeaveStatusComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveManagementRoutingModule {}
