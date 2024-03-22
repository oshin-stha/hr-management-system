import { Component } from '@angular/core';
import { LEAVE_MANAGEMENT_CONSTANTS } from 'src/app/shared/constants/leaveDetails.constants';
import {
  LEAVE_APPLY_PATH,
  LEAVE_COMPONENT_PATH,
  LEAVE_STATUS_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss'],
})
export class LeaveManagementComponent {
  LEAVE_MANAGEMENT_CONSTANTS = LEAVE_MANAGEMENT_CONSTANTS;
  SECURE_MODULE_PATH = SECURE_MODULE_PATH;
  LEAVE_MANAGEMENT_PATH = LEAVE_COMPONENT_PATH;
  LEAVE_STATUS_PATH = LEAVE_STATUS_PATH;
  LEAVE_APPLY_PATH = LEAVE_APPLY_PATH;
}
