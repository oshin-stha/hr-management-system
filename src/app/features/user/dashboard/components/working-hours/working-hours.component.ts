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
  }
  ngOnDestroy(): void {
    this.leaveDetailsSubscriber$.unsubscribe();
    this.destroyBarChart();
  }

  getAttendenceDetails(): void {
    this.leaveDetailsSubscriber$ = this.store
      .select(selectAttendenceDetails)
      .subscribe((res) => {
        this.leaveDetails = res;
        this.getWorkingHours();
        this.createChart();
      });
    this.store.dispatch(loadAttendenceDetails());
  }

  getWorkingHours(): void {
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

  createChart(): void {
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
