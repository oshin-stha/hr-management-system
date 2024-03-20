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
import { loadLeaveDetails } from 'src/app/shared/store/leave-overview-store/leave-overview.action';
import { getLeaveDetails } from 'src/app/shared/store/leave-overview-store/selector/leave-overview.selector';
import Chart from 'chart.js/auto';
import {
  ACCEPTED_STATUS,
  PENDING_STATUS,
} from 'src/app/shared/constants/status.constant';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { LeaveCount } from '../../models/leave-count.interface';

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
  data: number[] = [];
  dateData: string[] = [];

  private pieChart: Chart<'pie', number[], string> | undefined;
  private myBarChart: Chart<'bar', number[], string> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getLeaveDetails();
  }

  ngOnDestroy(): void {
    this.leaveDetailsSubscriber?.unsubscribe();
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.myBarChart) {
      this.myBarChart.destroy();
    }
  }

  getLeaveDetails(): void {
    this.store.dispatch(loadLeaveDetails());
    this.leaveDetailsSubscriber = this.store
      .select(getLeaveDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
        this.findLeaveDetailsOfEachDepartment();
        this.createPieChart();
        this.findAcceptedLeavesOfAllEmployees();
      });
  }

  findAcceptedLeavesOfAllEmployees(): void {
    const leaveCountsMap = new Map<string, number>();
    this.leaveDetails.forEach((data) => {
      if (data.status === ACCEPTED_STATUS) {
        const leaveFromDate = moment(data.leaveFrom);
        const leaveToDate = moment(data.leaveTo);

        while (leaveFromDate.isBefore(leaveToDate)) {
          const dateKey = leaveFromDate.format('YYYY-MM-DD');
          const currentCount = leaveCountsMap.get(dateKey);
          leaveCountsMap.set(dateKey, (currentCount ?? 0) + 1);
          leaveFromDate.add(1, 'day');
        }
      }
    });
    const leaveCountsArray = Array.from(leaveCountsMap, ([date, count]) => ({
      date,
      count,
    }));
    const sevenDaysAgo = moment().subtract(7, 'days');

    const leaveCountsLast7Days: LeaveCount[] = leaveCountsArray.filter((item) =>
      moment(item.date).isSameOrAfter(sevenDaysAgo),
    );

    leaveCountsLast7Days.forEach((element) => {
      this.data.push(element.count);
      this.dateData.push(element.date);
    });
    this.createBarChart();
  }

  createBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (this.myBarChart) {
      this.myBarChart.destroy();
    }

    this.myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dateData,
        datasets: [
          {
            label: '# of Votes',
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(0, 255, 255, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 255, 255, 1)',
            ],
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
            text: 'Leave trend from last & days',
          },
        },
      },
    });
  }

  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Administration',
          'Angular',
          'Ba',
          'DigitalMarketting',
          'DotNet',
          'Flutter',
          'GraphicDesigner',
          'Qa',
          'Ui/UX',
        ],
        datasets: [
          {
            label: '# of Votes',
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
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(0, 255, 255, 0.5)',
              'rgba(255, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 255, 255, 1)',
              'rgba(255, 0, 255, 1)',
              'rgba(0, 255, 0, 1)',
            ],
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
            text: 'Leave Trend Of Each Department',
          },
        },
      },
    });
  }

  findLeaveDetailsOfEachDepartment(): void {
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
