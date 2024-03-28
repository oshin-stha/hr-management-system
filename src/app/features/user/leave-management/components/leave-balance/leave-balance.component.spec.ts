import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { LeaveBalanceComponent } from './leave-balance.component';
import {
  getLeavebalanceStart,
  getLeavebalanceReset,
} from '../../store/leaveBalanceState/leaveBalance.action';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LeaveBalanceComponent', () => {
  let component: LeaveBalanceComponent;
  let fixture: ComponentFixture<LeaveBalanceComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveBalanceComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.returnValue(
      of({
        annualLeaveTotal: 20,
        annualLeaveRemaining: 10,
        sickLeaveTotal: 10,
        sickLeaveRemaining: 5,
        specialLeaveTaken: 2,
      }),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setLoadingSpinner action on ngOnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      setLoadingSpinner({ status: true }),
    );
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.getLeavebalanceSubscriber.closed).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(getLeavebalanceReset());
  });

  it('should dispatch getLeavebalanceStart action on startGetLeaveBalance', () => {
    component.userEmail = 'test@example.com';
    component.startGetLeaveBalance();
    expect(store.dispatch).toHaveBeenCalledWith(
      getLeavebalanceStart({ email: 'test@example.com' }),
    );
  });

  it('should set leave balance values on getLeaveBalance', () => {
    component.getLeaveBalance();
    expect(component.annualLeaveTotal).toBe(20);
    expect(component.annualLeaveRemaining).toBe(10);
    expect(component.sickLeaveTotal).toBe(10);
    expect(component.sickLeaveRemaining).toBe(5);
    expect(component.specialLeaveTaken).toBe(2);
  });
});
