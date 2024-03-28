import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveTrendRoutingModule } from './leave-trend-routing.module';
import { LeaveTrendComponent } from './component/leave-trend/leave-trend.component';
import { StoreModule } from '@ngrx/store';
import { SharedLeaveOverviewReducer } from 'src/app/shared/store/leave-overview-store/reducers/leave-overview.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SharedLeaveOverviewEffects } from 'src/app/shared/store/leave-overview-store/effects/leave-overview.effects';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SHARED_LEAVE_DETAILS } from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';

@NgModule({
  declarations: [LeaveTrendComponent],
  imports: [
    CommonModule,
    LeaveTrendRoutingModule,
    MaterialModule,
    StoreModule.forFeature(SHARED_LEAVE_DETAILS, SharedLeaveOverviewReducer),
    EffectsModule.forFeature([SharedLeaveOverviewEffects]),
  ],
})
export class LeaveTrendModule {}
