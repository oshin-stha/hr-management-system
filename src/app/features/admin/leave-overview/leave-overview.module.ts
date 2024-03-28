import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveOverviewRoutingModule } from './leave-overview-routing.module';
import { LeaveOverviewComponent } from './leave-overview.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LeaveOverviewEffects } from './store/effects/leave-overview.effect';
import { LeaveOverviewReducer } from './store/reducer/leave-overview.reducer';
import { FormsModule } from '@angular/forms';
import { SharedLeaveOverviewReducer } from 'src/app/shared/store/leave-overview-store/reducers/shared-leave-overview.reducers';
import { SharedLeaveOverviewEffects } from 'src/app/shared/store/leave-overview-store/effects/shared-leave-overview.effects';
import { SHARED_LEAVE_DETAILS } from 'src/app/shared/store/leave-overview-store/selector/shared-leave-overview.selector';
@NgModule({
  declarations: [LeaveOverviewComponent],
  imports: [
    CommonModule,
    LeaveOverviewRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('leaveDetails', LeaveOverviewReducer),
    StoreModule.forFeature(SHARED_LEAVE_DETAILS, SharedLeaveOverviewReducer),
    EffectsModule.forFeature([SharedLeaveOverviewEffects]),
    EffectsModule.forFeature([LeaveOverviewEffects]),
  ],
})
export class LeaveOverviewModule {}
