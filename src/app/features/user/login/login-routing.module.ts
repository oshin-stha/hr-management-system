import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AttendanceComponent } from '../attendance/attendance.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'attendance',component:AttendanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
