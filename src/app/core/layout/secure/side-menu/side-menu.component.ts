import { Component } from '@angular/core';
import {
  SECURE_MODULE_PATH,
  DASHBOARD_COMPONENT_PATH,
  ATTENDANCE_COMPONENT_PATH,
  LEAVE_COMPONENT_PATH,
  POLICY_COMPONENT_PATH,
  ADD_USER_COMPONENT_PATH,
} from 'src/app/shared/constants/routes.constanrs';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  SECURE_MODULE_PATH = SECURE_MODULE_PATH;
  DASHBOARD_COMPONENT_PATH = DASHBOARD_COMPONENT_PATH;
  ATTENDANCE_COMPONENT_PATH = ATTENDANCE_COMPONENT_PATH;
  LEAVE_COMPONENT_PATH = LEAVE_COMPONENT_PATH;
  POLICY_COMPONENT_PATH = POLICY_COMPONENT_PATH;
  ADD_USER_COMPONENT_PATH = ADD_USER_COMPONENT_PATH;
}
