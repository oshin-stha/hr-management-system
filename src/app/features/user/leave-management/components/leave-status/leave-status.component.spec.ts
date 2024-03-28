import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StoreModule, Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import {
  getLeaveStatusStart,
  getLeaveStatusReset,
} from '../../store/leaveStatusState/leaveStatus.action';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';
import { LeaveDetails } from '../../models/leaveDetails.interface';
import LeaveStatusComponent from './leave-status.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LeaveStatusComponent', () => {
  let component: LeaveStatusComponent;
  let fixture: ComponentFixture<LeaveStatusComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveStatusComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
      providers: [DatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStatusComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
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
    expect(component.getStatusSubscriber.closed).toBeTruthy();
    expect(component.getErrorSubscriber.closed).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(getLeaveStatusReset());
  });

  it('should set dataSource.paginator and dataSource.sort on ngAfterViewInit', () => {
    const mockSort = {} as MatSort;
    const mockPaginator = {} as MatPaginator;
    component.sort = mockSort;
    component.paginator = mockPaginator;
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(mockPaginator);
    expect(component.dataSource.sort).toBe(mockSort);
  });

  it('should apply filter correctly', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.dataSource.filter).toEqual('test');
  });

  it('should dispatch getLeaveStatusStart action on getLeaveDetails', () => {
    component.userEmail = 'test@example.com';
    component.getLeaveDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      getLeaveStatusStart({ email: 'test@example.com' }),
    );
  });

  it('should set status and call addingDataToDatasource on showLeaveStatus', () => {
    const mockStatus: LeaveDetails[] = [
      {
        email: 'test@example.com',
        leaveFrom: new Date(2022, 0, 1),
        leaveTo: new Date(2022, 0, 5),
        firstOrSecondHalf: 'First',
        totalLeaveDays: 5,
        leaveType: 'Sick',
        reasonForLeave: 'Fever',
        status: 'approved',
        fromDepartment: 'Angular',
      },
    ];
    spyOn(store, 'select').and.returnValue(of(mockStatus));
    spyOn(component, 'addingDataToDatasource').and.callThrough();
    component.showLeaveStatus();
    // expect(component.status).toEqual(mockStatus);
    expect(component.addingDataToDatasource).toHaveBeenCalled();
  });

  it('should format date correctly', () => {
    const mockTimestamp = { seconds: 1616774400, nanoseconds: 0 };
    const formattedDate = component.formatDate(mockTimestamp);
    expect(formattedDate).toBe('2021-03-26');
  });
});
