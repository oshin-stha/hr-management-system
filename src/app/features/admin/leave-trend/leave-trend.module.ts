import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveTrendRoutingModule } from './leave-trend-routing.module';
import { LeaveTrendComponent } from './component/leave-trend/leave-trend.component';
import { StoreModule } from '@ngrx/store';
import { SharedLeaveOverviewReducer } from 'src/app/shared/store/leave-overview-store/reducers/leave-overview.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SharedLeaveOverviewEffects } from 'src/app/shared/store/leave-overview-store/effects/leave-overview.effects';

@NgModule({
  declarations: [LeaveTrendComponent],
  imports: [
    CommonModule,
    LeaveTrendRoutingModule,
    StoreModule.forFeature('SharedleaveDetails', SharedLeaveOverviewReducer),
    EffectsModule.forFeature([SharedLeaveOverviewEffects]),
  ],
})
export class LeaveTrendModule {}
