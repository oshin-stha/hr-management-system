import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { selectAttendenceDetails } from '../../store/working-hours/selector/working-hours.selector';
import { AttendanceStateForGettingDataWithTimestamp } from 'src/app/shared/models/attendance.model';
import { loadAttendenceDetails } from '../../store/working-hours/working-hours.action';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
})
export class WorkingHoursComponent implements OnInit, OnDestroy {
  myChart: Chart<'bar', number[], string> | undefined;
  leaveDetails: AttendanceStateForGettingDataWithTimestamp[] = [];
  leaveDetailsSubscriber$: Subscription = new Subscription();
  noOfWorkingHours: number[] = [];
  dateOfWorkingHours: string[] = [];
  colorOfWorkingHours: string[] = [];
  labelOfWorkingHours: string[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAttendenceDetails();
    this.createChart();
  }
  ngOnDestroy(): void {
    this.leaveDetailsSubscriber$.unsubscribe();
  }

  getAttendenceDetails() {
    this.leaveDetailsSubscriber$ = this.store
      .select(selectAttendenceDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
        this.getWorkingHours();
      });
    this.store.dispatch(loadAttendenceDetails());
  }

  getWorkingHours() {
    this.noOfWorkingHours = [];
    this.colorOfWorkingHours = [];
    this.dateOfWorkingHours = [];
    this.leaveDetails.forEach((item) => {
      if (localStorage.getItem('Email') === item.email) {
        if (item.workingHours && item.checkInTime) {
          const date = item.checkInTime.toDate().toLocaleDateString();
          this.dateOfWorkingHours.push(date);
          this.noOfWorkingHours.push(item.workingHours);
          if (item.workingHours >= 8) {
            this.colorOfWorkingHours.push('#45B8AC');
            this.labelOfWorkingHours.push('>=8 Hours');
          } else if (item.workingHours < 5) {
            this.colorOfWorkingHours.push('#DD4124');
            this.labelOfWorkingHours.push('<5 Hours');
          } else {
            this.colorOfWorkingHours.push('#FFD662');
            this.labelOfWorkingHours.push('>5 & <8 Hours');
          }
        }
      }
    });
  }

  formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }

  destroyBarChart(): void {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.destroyBarChart();
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dateOfWorkingHours.splice(-30),
        datasets: [
          {
            label: 'Number of Working Hours',
            // label: this.labelOfWorkingHours,
            data: this.noOfWorkingHours.splice(-30),
            backgroundColor: this.colorOfWorkingHours,

            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(255, 159, 64, 0.2)'
            // ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
