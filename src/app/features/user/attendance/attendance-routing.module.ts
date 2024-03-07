import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';

import { ATTENDANCE_COMPONENT_PATH } from 'src/app/shared/constants/routes.constanrs';

const routes: Routes = [
  { path: ATTENDANCE_COMPONENT_PATH, component: AttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
