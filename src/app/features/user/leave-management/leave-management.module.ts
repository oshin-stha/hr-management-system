import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LeaveManagementRoutingModule } from './leave-management-routing.module';
import { LeaveManagementComponent } from './leave-management.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LeaveApplyReducer } from './store/applyLeaveState/applyLeave.reducer';
import { LEAVE_APPLY_SELECTOR } from './store/applyLeaveState/applyLeave.selector';
import { LeaveDetailsEffects } from './store/applyLeaveState/applyLeave.effects';
import LeaveStatusComponent from './components/leave-status/leave-status.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';
import { LeaveStausEffects } from './store/leaveStatusState/leaveStatus.effects';
import { LEAVE_STATUS_SELECTOR } from './store/leaveStatusState/leaveStatus.selector';
import { LeaveStatusReducer } from './store/leaveStatusState/leaveStatus.reducer';
import { LoaderSpinnerReducer } from 'src/app/shared/store/loader-spinner.reducer';
import { LEAVE_BALANCE_SELECTOR } from './store/leaveBalanceState/leaveBalance.selector';
import { LeaveBalanceReducer } from './store/leaveBalanceState/leaveBalance.reducer';
import { LeaveBalanceEffects } from './store/leaveBalanceState/leaveBalance.effects';

@NgModule({
  declarations: [
    LeaveManagementComponent,
    LeaveApplyComponent,
    LeaveStatusComponent,
    LeaveBalanceComponent,
  ],
  imports: [
    CommonModule,
    LeaveManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(
      LeaveDetailsEffects,
      LeaveStausEffects,
      LeaveBalanceEffects,
    ),
    StoreModule.forFeature(LEAVE_STATUS_SELECTOR, LeaveStatusReducer),
    StoreModule.forFeature(LEAVE_APPLY_SELECTOR, LeaveApplyReducer),
    StoreModule.forFeature('loader', LoaderSpinnerReducer),
    StoreModule.forFeature(LEAVE_BALANCE_SELECTOR, LeaveBalanceReducer),
  ],

  providers: [DatePipe],
})
export class LeaveManagementModule {}
