import { ActionReducerMap } from '@ngrx/store';
import { LeaveApplicationState } from './models/leaveApplicationState.interface';
import { LeaveStatusState } from './models/leaveStatus.State.interface';
import { LeaveApplyReducer } from './store/applyLeaveState/applyLeave.reducer';
import { LeaveStatusReducer } from './store/leaveStatusState/leaveStatus.reducer';

export interface LeaveState {
  leaveApply: LeaveApplicationState;
  leaveStatus: LeaveStatusState;
}
export const leaveManagementReducer: ActionReducerMap<LeaveState> = {
  leaveApply: LeaveApplyReducer,
  leaveStatus: LeaveStatusReducer,
};
