import { createFeatureSelector, createSelector } from '@ngrx/store';
import { workingHoursState } from '../working-hours.state';

export const WORK_HOURS_SELECTOR = 'work hours';
export const selectWorkHourStatus =
  createFeatureSelector<workingHoursState>(WORK_HOURS_SELECTOR);

export const selectUserDetails = createSelector(
  selectWorkHourStatus,
  (state) => state.userDetails,
);
export const selectAttendenceDetails = createSelector(
  selectWorkHourStatus,
  (state) => state.attendenceDetails,
);
