import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AttendanceReportRoutingModule } from './attendance-report-routing.module';
import { AttendanceReportComponent } from './attendance-report.component';
import { AttendanceDetails } from './components/attendance-details/attendance-details-store/attendance-details-effects/attendance-details.effects';
import {
  AttendanceListReducer,
  EmployeeNameReducer,
} from './components/attendance-details/attendance-details-store/attendance-details-reducer/attendance-details.reducer';
import {
  ATTENDANCE_LIST,
  USER_NAME,
} from './components/attendance-details/attendance-details-store/attendance-details-selector/attendance-details.selector';
import { AttendanceDetailsComponent } from './components/attendance-details/attendance-details.component';
import { AttendanceReport } from './components/attendance-overview/attendance-overview-store/effects/attendance-report.effects';
import { TodaysAttendanceReducer } from './components/attendance-overview/attendance-overview-store/reducer/attendance-report.reducer';
import { TODAYS_ATTENDANCE_DATA } from './components/attendance-overview/attendance-overview-store/selector/attendance-report.selector';
import { AttendanceOverviewComponent } from './components/attendance-overview/attendance-overview.component';

@NgModule({
  declarations: [
    AttendanceReportComponent,
    AttendanceDetailsComponent,
    AttendanceOverviewComponent,
  ],
  imports: [
    CommonModule,
    AttendanceReportRoutingModule,
    MaterialModule,
    StoreModule.forFeature(TODAYS_ATTENDANCE_DATA, TodaysAttendanceReducer),
    StoreModule.forFeature(ATTENDANCE_LIST, AttendanceListReducer),
    StoreModule.forFeature(USER_NAME, EmployeeNameReducer),
    EffectsModule.forFeature([AttendanceReport, AttendanceDetails]),
  ],
})
export class AttendanceReportModule {}
