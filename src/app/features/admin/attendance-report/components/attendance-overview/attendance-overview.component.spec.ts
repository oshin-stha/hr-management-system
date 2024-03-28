/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable, Subject, Subscription, of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {
  fetchTodaysAttendnaceData,
  resetTodaysAttendance,
} from './attendance-overview-store/attendance-overview.actions';
import { AttendanceOverviewComponent } from './attendance-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ATTENDANCE_REPORT_DETAILS,
  ATTENDANCE_REPORT_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';
import { By } from '@angular/platform-browser';
import { TodaysAttendanceState } from './attendance-overview-store/attendance-overview.state';

describe('AttendanceOverviewComponent', () => {
  let component: AttendanceOverviewComponent;
  let fixture: ComponentFixture<AttendanceOverviewComponent>;
  let store: Store;
  let router: Router;
  let todaysAttendanceDataSubject: Subject<any>;
  let paginator: MatPaginator;
  let sort: MatSort;
  let changeDetectorRef: ChangeDetectorRef;

  const dispatchSpy = jasmine.createSpy('dispatch');
  const selectSpy = jasmine
    .createSpy('select')
    .and.returnValue(of('test_employee'));

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    todaysAttendanceDataSubject = new Subject<any>();

    changeDetectorRef = {
      markForCheck: jasmine.createSpy('markForCheck'),
    } as unknown as ChangeDetectorRef;

    TestBed.configureTestingModule({
      declarations: [AttendanceOverviewComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test_id',
              },
            },
          },
        },
        {
          provide: Observable,
          useValue: todaysAttendanceDataSubject.asObservable(),
        },
        {
          provide: Store,
          useValue: {
            dispatch: dispatchSpy,
            select: selectSpy,
          },
        },
        provideMockStore(),
        {
          provide: ChangeDetectorRef,
          useValue: changeDetectorRef,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AttendanceOverviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should dispatch fetchTodaysAttendnaceData and subscribe to todaysAttendanceData$', () => {
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of([]));
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(fetchTodaysAttendnaceData());
    expect(component.todaysAttendanceData$).toBeTruthy();
  });

  it('formatData should correctly transform data', () => {
    const mockData: TodaysAttendanceState[] = [
      {
        attendance: {
          email: 'john.doe@example.com',
          checkInTime: new Date(1616673600 * 1000),
          checkOutTime: new Date(1616677200 * 1000),
          checkInStatus: 'Checked-In',
          checkOutStatus: 'Checked-Out',
          checkInReason: 'Reason for check-in',
          checkOutReason: 'Reason for check-out',
          workingHours: 8,
          absent: 'Present',
        },
        userNameEmployeeID: {
          firstName: 'John',
          lastName: 'Doe',
          middleName: '',
          employeeId: '123456',
        },
      },
    ];
    const mockTodaysAttendanceData$ = new BehaviorSubject<
      TodaysAttendanceState[]
    >(mockData);
    spyOn(component, 'formatData').and.callThrough();
    spyOn(store, 'select').and.returnValue(mockTodaysAttendanceData$);

    component.ngOnInit();

    expect(component.formatData).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('John Doe');
  });

  it('ngAfterViewInit should set paginator and sort if available', () => {
    paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    sort = new MatSort();

    component.paginator = paginator;
    component.sort = sort;

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toEqual(paginator);
    expect(component.dataSource.sort).toEqual(sort);
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

  it('attendanceDetails should navigate to correct route', () => {
    spyOn(router, 'navigate').and.stub();
    component.attendanceDetails('123');
    expect(router.navigate).toHaveBeenCalledWith([
      `/${SECURE_MODULE_PATH}/${ATTENDANCE_REPORT_PATH}/${ATTENDANCE_REPORT_DETAILS}/123`,
    ]);
  });

  it('formatDate should format timestamp correctly', () => {
    const formattedDate = component.formatDate({
      seconds: 1616673600,
      nanoseconds: 0,
    });
    expect(formattedDate).toBe('5:45:00 PM');
  });

  it('ngOnDestroy should unsubscribe and dispatch resetTodaysAttendance', () => {
    const unsubscribeSpy = spyOn(
      component.todaysAttendanceDataSubscrition as Subscription,
      'unsubscribe',
    );
    spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(resetTodaysAttendance());
  });
});
