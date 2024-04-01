import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { LeaveCount } from 'src/app/features/admin/leave-trend/models/leave-count.interface';
import { ALERT_MESSAGE } from 'src/app/shared/constants/alert confirmation.constants';
import { DATE_FORMAT, DAY } from 'src/app/shared/constants/email.constant';
import {
  ACCEPTED_STATUS,
  REJECTED_STATUS,
} from 'src/app/shared/constants/status.constant';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable({
  providedIn: 'root',
})
export class CheckValidationsService {
  constructor(private store: Store) {}

  getDatesOfLeaveToTake(formData: FormGroup): string[] {
    const startDate = moment(formData.value.leaveFrom);
    const leavesToTake: string[] = [];
    const endDate = formData.value.leaveTo
      ? moment(formData.value.leaveTo)
      : moment(formData.value.leaveFrom);
    console.log(endDate); // removing console
    while (startDate.isSameOrBefore(endDate)) {
      leavesToTake.push(startDate.format(DATE_FORMAT));
      startDate.add(1, DAY); // donot use magical number  'hard coded number'
    }
    return leavesToTake;
  }

  getLeaveDatesOfLeaveTakenBySelf(
    leaveDetails: LeaveDetails[],
    userEmail: string,
  ): Map<string, number> {
    const leaveCountsMap = new Map<string, number>();
    for (const item of leaveDetails) {
      if (item.email === userEmail && item.status != REJECTED_STATUS) {
        // deep equality
        const leaveStartDate = moment(item.leaveFrom.toDate());
        const leaveEndDate = moment(item.leaveTo.toDate());
        this.getCountForTotalLeavesTakenBySelf(
          leaveStartDate,
          leaveEndDate,
          leaveCountsMap,
        );
      }
    }
    return leaveCountsMap;
  }

  getCountForTotalLeavesTakenBySelf(
    leaveStartDate: moment.Moment,
    leaveEndDate: moment.Moment,
    leaveCountsMap: Map<string, number>, // Map<string, number> what does it mean
  ): void {
    while (leaveStartDate.isSameOrBefore(leaveEndDate)) {
      // while why
      const dateKey = leaveStartDate.format(DATE_FORMAT);
      const currentCount = leaveCountsMap.get(dateKey) || 0;
      leaveCountsMap.set(dateKey, (currentCount ?? 0) + 1);
      leaveStartDate.add(1, DAY);
    }
  }

  getDatesOfLeavesAccepted(
    leaveDetails: LeaveDetails[],
    department: string,
  ): Map<string, number> {
    const leaveCountsMap = new Map<string, number>();
    for (const item of leaveDetails) {
      if (
        department &&
        item.status === ACCEPTED_STATUS &&
        item.fromDepartment === department
      ) {
        const leaveStartDate = moment(item.leaveFrom.toDate());
        const leaveEndDate = moment(item.leaveTo.toDate());
        this.getCountForTotalLeavesTaken(
          leaveStartDate,
          leaveEndDate,
          leaveCountsMap,
        );
      }
    }
    return leaveCountsMap;
  }

  getCountForTotalLeavesTaken(
    leaveStartDate: moment.Moment,
    leaveEndDate: moment.Moment,
    leaveCountsMap: Map<string, number>,
  ): void {
    while (leaveStartDate.isSameOrBefore(leaveEndDate)) {
      const dateKey = leaveStartDate.format(DATE_FORMAT);
      const currentCount = leaveCountsMap.get(dateKey) || 0;
      leaveCountsMap.set(dateKey, (currentCount ?? 0) + 1);
      leaveStartDate.add(1, DAY);
    }
  }
  checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen(
    leavesToTake: string[],
    leavesTakenByEmployees: LeaveCount[],
  ): boolean {
    let confirmationShown = false;
    this.store.dispatch(setLoadingSpinner({ status: false }));
    for (const item of leavesToTake) {
      for (const element of leavesTakenByEmployees) {
        if (item === element.date && element.count > 5) {
          // donot use magical number
          if (!confirmationShown) {
            const confirmation = confirm(
              `${ALERT_MESSAGE.LARGE_NUMBER_OF_LEAVES} ${element.date} ${ALERT_MESSAGE.STILL_PROCEED}`,
            );
            if (!confirmation) {
              return true;
            }
            confirmationShown = true;
          }
        }
      }
    }
    return false;
  }
}
