import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRemainingLeave } from '../../store/remaining-leave/selectors/remaining-leace.selector';
import { getRemainingLeaveStart } from '../../store/remaining-leave/remaining-leave.action';
import { Subscription } from 'rxjs';
import { RemainingLeaves } from '../../models/remaining-leave.interface';

@Component({
  selector: 'app-remaining-leave',
  templateUrl: './remaining-leave.component.html',
  styleUrls: ['./remaining-leave.component.scss'],
})
export class RemainingLeaveComponent implements OnInit, OnDestroy {
  selectRemainingLeaveSubscription$: Subscription = new Subscription();
  remainingLeaves: RemainingLeaves = {} as RemainingLeaves;
  tiles: {
    text: string | number;
    cols: number;
    rows: number;
    color: string;
    textcolor: string;
  }[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadRemainingLeaves();
  }
  ngOnDestroy(): void {
    this.selectRemainingLeaveSubscription$.unsubscribe;
  }

  loadRemainingLeaves(): void {
    this.selectRemainingLeaveSubscription$ = this.store
      .select(selectRemainingLeave)
      .subscribe((res) => {
        this.remainingLeaves = res;
        this.initializeTiles();
      });
    this.store.dispatch(getRemainingLeaveStart());
  }

  initializeTiles() {
    this.tiles = [
      {
        text: 'Sick Leave Remaining',
        cols: 3,
        rows: 1,
        color: 'aliceblue',
        textcolor: '#88B04B',
      },
      {
        text: this.remainingLeaves.sickLeaveRemaining,
        cols: 1,
        rows: 1,
        color: '#88B04B',
        textcolor: 'white',
      },
      {
        text: 'Annual Leave Remaining',
        cols: 3,
        rows: 1,
        color: 'aliceblue',
        textcolor: '#34568B',
      },
      {
        text: this.remainingLeaves.annualLeaveRemaining,
        cols: 1,
        rows: 1,
        color: '#34568B',
        textcolor: 'white',
      },
      {
        text: 'Special Leave Taken',
        cols: 3,
        rows: 1,
        color: 'aliceblue',
        textcolor: '#FF6F61',
      },
      {
        text: this.remainingLeaves.specialLeaveTaken,
        cols: 1,
        rows: 1,
        color: '#FF6F61',
        textcolor: 'white',
      },
    ];
  }
}
