import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ATTENDANCE_REPORT_DETAILS,
  ID,
} from 'src/app/shared/constants/routes.constants';
import { AttendanceDetailsComponent } from './components/attendance-details/attendance-details.component';
import { AttendanceReportComponent } from './attendance-report.component';
import { AttendanceOverviewComponent } from './components/attendance-overview/attendance-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceReportComponent,
    children: [
      { path: '', component: AttendanceOverviewComponent },
      {
        path: ATTENDANCE_REPORT_DETAILS + ID,
        component: AttendanceDetailsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceReportRoutingModule {}
