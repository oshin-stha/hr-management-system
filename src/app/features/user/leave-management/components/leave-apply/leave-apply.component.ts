import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_CONTROL_NAMES } from 'src/app/shared/constants/form-field.constant';
import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
import { Store } from '@ngrx/store';
import {
  getLeavebalanceReset,
  getLeavebalanceStart,
} from '../../store/leaveBalanceState/leaveBalance.action';
import { getLeaveBalance } from '../../store/leaveBalanceState/selector/leaveBalance.selector';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import {
  loadLeaveDetails,
  loadUserDetails,
  resetLeaveDetails,
  resetUserDetails,
} from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import {
  getLeaveDetails,
  selectUserDetails,
} from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import { MatSelectChange } from '@angular/material/select';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import { LeaveCount } from 'src/app/features/admin/leave-trend/models/leave-count.interface';
import { FORM_ERRORS } from 'src/app/shared/constants/errors.constants';
import { ApplyLeaveService } from '../../services/apply-for-leave-service/apply-leave.service';
import { LEAVE_APPLY_FORM_CONSTANTS } from 'src/app/shared/constants/leaveDetails.constants';
import { EMAIL } from 'src/app/shared/constants/email.constant';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { CheckValidationsService } from '../../services/check-validations-leave-apply-service/check-validations.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent implements OnInit, OnDestroy {
  leaveApplicationForm = new FormGroup({});
  getLeaveDetailsSubscriber: Subscription = new Subscription();
  getUserDetailsSubscriber: Subscription = new Subscription();
  getLeaveBalanceSubscriber: Subscription = new Subscription();
  FORM_CONTROL_NAMES = FORM_CONTROL_NAMES;
  LEAVE_TYPES = LEAVE_TYPE;
  userEmail: string | null = '';
  leaveBalance: LeaveBalanceDetails | undefined;
  isHalfDay = false;
  minDateForLeaveFrom = new Date();
  minDateForLeaveTo: Date | undefined;
  leaveDetails: LeaveDetails[] = [];
  department: string | undefined;
  leavesToTake: string[] = [];
  leavesTakenByEmployees: LeaveCount[] = [];
  isAnnualLeaveDisabled = false;
  isSpeciaalLeaveDisable = false;
  isSickLeaveDisabled = false;
  FORM_ERRORS = FORM_ERRORS;
  LEAVE_APPLY_FORM_CONSTANTS = LEAVE_APPLY_FORM_CONSTANTS;
  leavesTakenBySelf: LeaveCount[] = [];

  constructor(
    private formService: LeaveFormService,
    private leaveApplyService: ApplyLeaveService,
    private store: Store,
    private checkValidationService: CheckValidationsService,
  ) {}

  ngOnInit(): void {
    this.createFormAndGetuserEmail();
    this.getUserDetails();
    this.getLeaveDetails();
    this.getLeaveBalance();
  }

  ngOnDestroy(): void {
    this.getLeaveBalanceSubscriber.unsubscribe();
    this.getUserDetailsSubscriber.unsubscribe();
    this.getLeaveDetailsSubscriber.unsubscribe();
    this.store.dispatch(getLeavebalanceReset());
    this.store.dispatch(resetUserDetails());
    this.store.dispatch(resetLeaveDetails());
  }

  createFormAndGetuserEmail(): void {
    this.leaveApplicationForm = this.formService.createLeaveApplicationForm();
    this.leaveApplicationForm.reset();
    this.userEmail = localStorage.getItem(EMAIL);
  }

  updateMinDateForLeaveTo(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const selectedDate = new Date(event.value);
      selectedDate.setDate(selectedDate.getDate());
      this.minDateForLeaveTo = selectedDate;
    }
  }

  startGetLeaveBalance(): void {
    if (this.userEmail) {
      this.store.dispatch(getLeavebalanceStart({ email: this.userEmail }));
    }
  }

  getLeaveBalance(): void {
    this.getLeaveBalanceSubscriber = this.store
      .select(getLeaveBalance)
      .subscribe((res) => {
        this.leaveBalance = res;
        this.checkLeaveAvailability(res);
      });
    this.startGetLeaveBalance();
  }

  checkLeaveAvailability(res: LeaveBalanceDetails): void {
    this.isAnnualLeaveDisabled = res.annualLeaveRemaining <= 0;
    this.isSickLeaveDisabled = res.sickLeaveRemaining <= 0;
    this.isSpeciaalLeaveDisable =
      res.annualLeaveRemaining >= 1 || res.sickLeaveRemaining >= 1;
  }

  getUserDetails(): void {
    this.getUserDetailsSubscriber = this.store
      .select(selectUserDetails)
      .subscribe((res) => {
        res.forEach((element) => {
          if (this.userEmail && this.userEmail === element.email) {
            this.department = element.department;
          }
        });
      });
    this.store.dispatch(loadUserDetails());
  }

  getLeaveDetails(): void {
    this.getLeaveDetailsSubscriber = this.store
      .select(getLeaveDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
      });
    this.store.dispatch(loadLeaveDetails());
  }

  getDatesOfLeaveToTake(formData: FormGroup): void {
    this.leavesToTake =
      this.checkValidationService.getDatesOfLeaveToTake(formData);
  }

  getLeaveDatesOfLeaveTakenBySelf(): void {
    let leaveCountsMap = new Map<string, number>();
    if (this.userEmail)
      leaveCountsMap =
        this.checkValidationService.getLeaveDatesOfLeaveTakenBySelf(
          this.leaveDetails,
          this.userEmail,
        );
    this.leavesTakenBySelf = Array.from(leaveCountsMap, ([date, count]) => ({
      date,
      count,
    }));
  }

  getDatesOfLeavesAccepted(): void {
    let leaveCountsMap = new Map<string, number>();
    if (this.department)
      leaveCountsMap = this.checkValidationService.getDatesOfLeavesAccepted(
        this.leaveDetails,
        this.department,
      );
    this.leavesTakenByEmployees = Array.from(
      leaveCountsMap,
      ([date, count]) => ({ date, count }),
    );
  }

  checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen(): boolean {
    return this.checkValidationService.checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen(
      this.leavesToTake,
      this.leavesTakenByEmployees,
    );
  }

  onInputChange(event: MatSelectChange): void {
    if (event.value === FORM_CONTROL_NAMES.HALF_DAY_LEAVE) {
      this.isHalfDay = true;
      this.leaveApplicationForm.get(FORM_CONTROL_NAMES.LEAVE_TO)?.reset();
    } else {
      this.isHalfDay = false;
      this.leaveApplicationForm
        .get(FORM_CONTROL_NAMES.FIRST_OR_SECOND_HALF)
        ?.reset();
    }
  }

  applyForLeave(formData: FormGroup): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.getDatesOfLeaveToTake(formData);
    this.getDatesOfLeavesAccepted();
    this.getLeaveDatesOfLeaveTakenBySelf();
    if (
      !this.checkIfMoreEmployeesHaveTakenLeaveOnTheLeaveDatesChosen() &&
      this.userEmail &&
      this.leaveBalance &&
      this.department
    ) {
      this.leaveApplyService.applyForLeave(
        formData,
        this.userEmail,
        this.leaveBalance,
        this.isHalfDay,
        this.department,
        this.leavesTakenBySelf,
      );
    }
  }
}
