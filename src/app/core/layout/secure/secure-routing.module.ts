import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';
const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {path:'',loadChildren:()=> import('../../../features/user/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path:'attendance',loadChildren:()=>import('../../../features/user/attendance/attendance.module').then(m=>m.AttendanceModule)},
      {path:'leave',loadChildren:()=>import('../../../features/user/leave-management/leave-management.module').then(m=>m.LeaveManagementModule)},
      {path:'policy',loadChildren:()=>import('../../../features/user/policy/policy.module').then(m=>m.PolicyModule)},
      {path:'adduser',loadChildren:()=>import('../../../features/admin/add-user/add-user.module').then(m=>m.AddUserModule)}
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
