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
@NgModule({
  declarations: [LeaveOverviewComponent],
  imports: [
    CommonModule,
    LeaveOverviewRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('leaveDetails', LeaveOverviewReducer),
    EffectsModule.forFeature([LeaveOverviewEffects]),
  ],
})
export class LeaveOverviewModule {}
