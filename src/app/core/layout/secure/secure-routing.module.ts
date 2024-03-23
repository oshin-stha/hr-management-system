import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD_USER_COMPONENT_PATH,
  ATTENDANCE_REPORT_PATH,
  DASHBOARD_COMPONENT_PATH,
  LEAVE_COMPONENT_PATH,
  LEAVE_OVERVIEW_PATH,
  LEAVE_TREND_PATH,
  POLICY_COMPONENT_PATH,
  UPDATE_POLICY_PATH,
} from 'src/app/shared/constants/routes.constants';
import { SecureComponent } from './secure.component';
import { adminGuard } from '../../guard/admin-guard/admin.guard';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found/page-not-found.component';
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
        canMatch: [adminGuard],
        loadChildren: () =>
          import('../../../features/admin/add-user/add-user.module').then(
            (m) => m.AddUserModule,
          ),
      },
      {
        path: ATTENDANCE_REPORT_PATH,
        canMatch: [adminGuard],
        loadChildren: () =>
          import(
            '../../../features/admin/attendance-report/attendance-report.module'
          ).then((m) => m.AttendanceReportModule),
      },
      {
        path: LEAVE_OVERVIEW_PATH,
        canMatch: [adminGuard],
        loadChildren: () =>
          import(
            '../../../features/admin/leave-overview/leave-overview.module'
          ).then((m) => m.LeaveOverviewModule),
      },
      {
        path: LEAVE_TREND_PATH,
        loadChildren: () =>
          import('../../../features/admin/leave-trend/leave-trend.module').then(
            (m) => m.LeaveTrendModule,
          ),
      },
      {
        path: UPDATE_POLICY_PATH,
        canMatch: [adminGuard],
        loadChildren: () =>
          import(
            '../../../features/admin/update-policy/update-policy.module'
          ).then((m) => m.UpdatePolicyModule),
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
