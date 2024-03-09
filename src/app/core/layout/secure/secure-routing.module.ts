import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD_USER_COMPONENT_PATH,
  DASHBOARD_COMPONENT_PATH,
  LEAVE_COMPONENT_PATH,
  POLICY_COMPONENT_PATH,
} from 'src/app/shared/constants/routes.constanrs';
import { SecureComponent } from './secure.component';
const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {
        path: DASHBOARD_COMPONENT_PATH,
        loadChildren: () =>
          import('../../../features/user/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../features/user/attendance/attendance.module').then(
            (m) => m.AttendanceModule,
          ),
      },
      {
        path: LEAVE_COMPONENT_PATH,
        loadChildren: () =>
          import(
            '../../../features/user/leave-management/leave-management.module'
          ).then((m) => m.LeaveManagementModule),
      },
      {
        path: POLICY_COMPONENT_PATH,
        loadChildren: () =>
          import('../../../features/user/policy/policy.module').then(
            (m) => m.PolicyModule,
          ),
      },
      {
        path: ADD_USER_COMPONENT_PATH,
        loadChildren: () =>
          import('../../../features/admin/add-user/add-user.module').then(
            (m) => m.AddUserModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
