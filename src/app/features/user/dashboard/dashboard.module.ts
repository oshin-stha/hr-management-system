import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';
import { WorkingHoursComponent } from './components/working-hours/working-hours.component';
import { StoreModule } from '@ngrx/store';
import { WORK_HOURS_SELECTOR } from './store/working-hours/selector/working-hours.selector';
import { workHourReducer } from './store/working-hours/reducer/working-hours.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorkingHoursEffect } from './store/working-hours/effects/working-hours.effect';

@NgModule({
  declarations: [
    DashboardComponent,
    LeaveStatusComponent,
    WorkingHoursComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature(WORK_HOURS_SELECTOR, workHourReducer),
    EffectsModule.forFeature(WorkingHoursEffect),
  ],
})
export class DashboardModule {}
