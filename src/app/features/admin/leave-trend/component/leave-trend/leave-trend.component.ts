import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ADMINISTRATION,
  ANGULAR,
  BA,
  DIGITAL_MARKETTING,
  DOT_NET,
  FLUTTER,
  GRAPHIC_DESIGNER,
  QA,
  UI_UX,
} from 'src/app/shared/constants/departName.constants';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import {
  loadLeaveDetails,
  resetLeaveDetails,
} from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import { getLeaveDetails } from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import Chart from 'chart.js/auto';
import { ACCEPTED_STATUS } from 'src/app/shared/constants/status.constant';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { LEAVE_TYPE } from 'src/app/shared/constants/leaveType.constants';
import {
  DATE_FORMAT,
  DAY,
  DAYS,
} from 'src/app/shared/constants/email.constant';
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
} from 'src/app/shared/constants/color-constsnts';
import { DEPARTMENTS } from 'src/app/shared/constants/department.constants';
import {
  BAR,
  BAR_CHART,
  LEAVE_TREND_CONSTANTS,
  PIE,
  PIE_CHART,
  TOTAL_LEAVES,
} from 'src/app/shared/constants/leaveTrends.constants';

@Component({
  selector: 'app-leave-trend',
  templateUrl: './leave-trend.component.html',
  styleUrls: ['./leave-trend.component.scss'],
})
export class LeaveTrendComponent implements OnInit, OnDestroy {
  leaveDetails: LeaveDetails[] = [];
  totalLeaveTakenByAdministration = 0;
  totalLeaveTakenByQa = 0;
  totalLeaveTakenByBa = 0;
  totalLeaveTakenByAngular = 0;
  totalLeaveTakenByFlutter = 0;
  totalLeaveTakenByDotNet = 0;
  totalLeaveTakenByGraphicDesigner = 0;
  totalLeaveTakenByUiUx = 0;
  totalLeaveTakenByDigitalMarketting = 0;
  leaveDetailsSubscriber: Subscription = new Subscription();
  barChartData: number[] = [];
  barChartDateData: string[] = [];
  LEAVE_TREND_CONSTANTS = LEAVE_TREND_CONSTANTS;
  pieChart: Chart<'pie', number[], string> | undefined;
  myBarChart: Chart<'bar', number[], string> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getLeaveDetails();
  }

  ngOnDestroy(): void {
    this.leaveDetailsSubscriber.unsubscribe();
    this.destroyPieChart();
    this.destroyBarChart();
    // this.store.dispatch(resetLeaveDetails());
  }

  getLeaveDetails(): void {
    this.leaveDetailsSubscriber = this.store
      .select(getLeaveDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
        this.findLeaveDetailsOfEachDepartment();
        this.createPieChart();
        this.findAcceptedLeavesOfAllEmployees();
      });

    this.store.dispatch(loadLeaveDetails());
  }

  findAcceptedLeavesOfAllEmployees(): void {
    this.barChartData = [];
    this.barChartDateData = [];
    const leaveCountsMap = new Map<string, number>();
    this.leaveDetails.forEach((item) => {
      if (item.status === ACCEPTED_STATUS) {
        const leaveFromDate = moment(item.leaveFrom.toDate());
        const leaveToDate = moment(item.leaveTo.toDate());
        this.getTotalLeaveCount(
          item,
          leaveFromDate,
          leaveToDate,
          leaveCountsMap,
        );
      }
    });

    this.getFifteenDaysCount(leaveCountsMap);
    this.createBarChart();
  }

  getFifteenDaysCount(leaveCountsMap: Map<string, number>): void {
    const today = moment();
    const fifteenDaysAfterTomorrow = today.clone().add(16, DAYS);
    for (
      let date = today.clone();
      date.isBefore(fifteenDaysAfterTomorrow, DAY);
      date.add(1, DAY)
    ) {
      const dateKey = date.format(DATE_FORMAT);
      const count = leaveCountsMap.get(dateKey) ?? 0;
      this.barChartData.push(count);
      this.barChartDateData.push(dateKey);
    }
  }

  getTotalLeaveCount(
    item: LeaveDetails,
    leaveFromDate: moment.Moment,
    leaveToDate: moment.Moment,
    leaveCountsMap: Map<string, number>,
  ): void {
    while (leaveFromDate.isSameOrBefore(leaveToDate)) {
      const dateKey = leaveFromDate.format(DATE_FORMAT);
      const currentCount = leaveCountsMap.get(dateKey);
      if (
        item.firstOrSecondHalf === LEAVE_TYPE.FIRST_HALF_LEAVE ||
        item.firstOrSecondHalf === LEAVE_TYPE.SECOND_HALF_LEAVE
      )
        leaveCountsMap.set(dateKey, (currentCount ?? 0) + 0.5);
      else leaveCountsMap.set(dateKey, (currentCount ?? 0) + 1);
      leaveFromDate.add(1, DAY);
    }
  }

  destroyBarChart(): void {
    if (this.myBarChart) {
      this.myBarChart.destroy();
    }
  }

  destroyPieChart(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }

  createBarChart(): void {
    const ctx = document.getElementById(BAR_CHART) as HTMLCanvasElement;
    this.destroyBarChart();
    this.myBarChart = new Chart(ctx, {
      type: BAR,
      data: {
        labels: this.barChartDateData,
        datasets: [
          {
            label: TOTAL_LEAVES,
            data: this.barChartData,
            backgroundColor: BACKGROUND_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
          },
        },
      },
    });
  }

  createPieChart(): void {
    const ctx = document.getElementById(PIE_CHART) as HTMLCanvasElement;
    this.destroyPieChart();
    this.pieChart = new Chart(ctx, {
      type: PIE,
      data: {
        labels: DEPARTMENTS,
        datasets: [
          {
            label: TOTAL_LEAVES,
            data: [
              this.totalLeaveTakenByAdministration,
              this.totalLeaveTakenByAngular,
              this.totalLeaveTakenByBa,
              this.totalLeaveTakenByDigitalMarketting,
              this.totalLeaveTakenByDotNet,
              this.totalLeaveTakenByFlutter,
              this.totalLeaveTakenByGraphicDesigner,
              this.totalLeaveTakenByQa,
              this.totalLeaveTakenByUiUx,
            ],
            backgroundColor: BACKGROUND_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
          },
        },
      },
    });
  }

  resetLeaveDataOfAllDepartment(): void {
    this.totalLeaveTakenByAdministration = 0;
    this.totalLeaveTakenByQa = 0;
    this.totalLeaveTakenByBa = 0;
    this.totalLeaveTakenByAngular = 0;
    this.totalLeaveTakenByFlutter = 0;
    this.totalLeaveTakenByDotNet = 0;
    this.totalLeaveTakenByGraphicDesigner = 0;
    this.totalLeaveTakenByUiUx = 0;
    this.totalLeaveTakenByDigitalMarketting = 0;
  }

  findLeaveDetailsOfEachDepartment(): void {
    this.resetLeaveDataOfAllDepartment();
    this.leaveDetails.forEach((data) => {
      if (data.status === ACCEPTED_STATUS) {
        this.findLeaveDetaildOfAdministration(data);
        this.findLeaveDetaildOfQa(data);
        this.findLeaveDetaildOfAngular(data);
        this.findLeaveDetaildOfDotNet(data);
        this.findLeaveDetaildOfUiUx(data);
        this.findLeaveDetaildOfFlutter(data);
        this.findLeaveDetaildOfBa(data);
        this.findLeaveDetaildOfGraphicDesigner(data);
        this.findLeaveDetaildOfDigitalMarketing(data);
      }
    });
  }

  findLeaveDetaildOfAdministration(data: LeaveDetails): void {
    if (data.fromDepartment === ADMINISTRATION) {
      this.totalLeaveTakenByAdministration += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfQa(data: LeaveDetails): void {
    if (data.fromDepartment === QA) {
      this.totalLeaveTakenByQa += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfAngular(data: LeaveDetails): void {
    if (data.fromDepartment === ANGULAR) {
      this.totalLeaveTakenByAngular += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfDotNet(data: LeaveDetails): void {
    if (data.fromDepartment === DOT_NET) {
      this.totalLeaveTakenByDotNet += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfUiUx(data: LeaveDetails): void {
    if (data.fromDepartment === UI_UX) {
      this.totalLeaveTakenByUiUx += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfFlutter(data: LeaveDetails): void {
    if (data.fromDepartment === FLUTTER) {
      this.totalLeaveTakenByFlutter += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfBa(data: LeaveDetails): void {
    if (data.fromDepartment === BA) {
      this.totalLeaveTakenByBa += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfGraphicDesigner(data: LeaveDetails): void {
    if (data.fromDepartment === GRAPHIC_DESIGNER) {
      this.totalLeaveTakenByGraphicDesigner += data.totalLeaveDays;
    }
  }

  findLeaveDetaildOfDigitalMarketing(data: LeaveDetails): void {
    if (data.fromDepartment === DIGITAL_MARKETTING) {
      this.totalLeaveTakenByDigitalMarketting += data.totalLeaveDays;
    }
  }
}
