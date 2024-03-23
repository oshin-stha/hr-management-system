import { Component, Input, OnInit } from '@angular/core';
import {
  SECURE_MODULE_PATH,
  DASHBOARD_COMPONENT_PATH,
  ATTENDANCE_COMPONENT_PATH,
  LEAVE_COMPONENT_PATH,
  POLICY_COMPONENT_PATH,
  ADD_USER_COMPONENT_PATH,
  ATTENDANCE_REPORT_PATH,
  LEAVE_OVERVIEW_PATH,
  UPDATE_POLICY_PATH,
  LEAVE_TREND_PATH,
} from 'src/app/shared/constants/routes.constants';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  role: string | undefined | null;
  @Input() isUser = true;
  showAdminLinks = true;

  SECURE_MODULE_PATH = SECURE_MODULE_PATH;
  DASHBOARD_COMPONENT_PATH = DASHBOARD_COMPONENT_PATH;
  ATTENDANCE_COMPONENT_PATH = ATTENDANCE_COMPONENT_PATH;
  LEAVE_COMPONENT_PATH = LEAVE_COMPONENT_PATH;
  POLICY_COMPONENT_PATH = POLICY_COMPONENT_PATH;
  ADD_USER_COMPONENT_PATH = ADD_USER_COMPONENT_PATH;
  ATTENDANCE_REPORT_PATH = ATTENDANCE_REPORT_PATH;
  LEAVE_OVERVIEW_PATH = LEAVE_OVERVIEW_PATH;
  LEAVE_TREND_PATH = LEAVE_TREND_PATH;
  UPDATE_POLICY_PATH = UPDATE_POLICY_PATH;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }
}
