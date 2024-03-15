import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  AttendanceDataFetchReducer,
  AttendanceReducer,
} from './store/reducer/attendance.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AttendanceEffects } from './store/effects/attendance.effects';
import {
  ATTENDANCE_DATA_FETCH,
  CHECK_IN_STATE_SELECTOR,
} from './store/selector/attendance.selector';

@NgModule({
  declarations: [AttendanceComponent, DialogComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature(CHECK_IN_STATE_SELECTOR, AttendanceReducer),
    StoreModule.forFeature(ATTENDANCE_DATA_FETCH, AttendanceDataFetchReducer),
    EffectsModule.forFeature([AttendanceEffects]),
  ],
})
export class AttendanceModule {}
