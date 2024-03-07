import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AttendanceComponent } from '../attendance/attendance.component';
import { ATTENDANCE_COMPONENT_PATH } from 'src/app/shared/constants/routes.constanrs';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: ATTENDANCE_COMPONENT_PATH, component: AttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
