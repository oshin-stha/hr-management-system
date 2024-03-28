import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceDetailsService } from './attendance-details-service/attendance-details.service';
import {
  loadAttendanceDetails,
  loadAttendanceDetailsReset,
  loademployeeName,
} from './attendance-details-store/attendance-details.actions';
import { AttendanceDetailsComponent } from './attendance-details.component';

describe('AttendanceDetailsComponent', () => {
  let component: AttendanceDetailsComponent;
  let fixture: ComponentFixture<AttendanceDetailsComponent>;
  let store: MockStore;
  let paginator: MatPaginator;
  let sort: MatSort;
  let changeDetectorRef: ChangeDetectorRef;
  let attendanceDetailsServiceSpy: jasmine.SpyObj<AttendanceDetailsService>;

  const dispatchSpy = jasmine.createSpy('dispatch');
  const selectSpy = jasmine
    .createSpy('select')
    .and.returnValue(of('test_employee'));

  beforeEach(async () => {
    const attendanceDetailsServiceSpyObj = jasmine.createSpyObj(
      'AttendanceDetailsService',
      ['attendanceOverviewRoute'],
    );

    changeDetectorRef = {
      markForCheck: jasmine.createSpy('markForCheck'),
    } as unknown as ChangeDetectorRef;

    await TestBed.configureTestingModule({
      declarations: [AttendanceDetailsComponent],
      imports: [
        StoreModule.forRoot({}),
        MaterialModule,
        BrowserAnimationsModule,
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
          provide: AttendanceDetailsService,
          useValue: attendanceDetailsServiceSpyObj,
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

    fixture = TestBed.createComponent(AttendanceDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    attendanceDetailsServiceSpy = TestBed.inject(
      AttendanceDetailsService,
    ) as jasmine.SpyObj<AttendanceDetailsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', () => {
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of('test_employee'));
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      loademployeeName({ employeeId: 'test_id' }),
    );
  });

  it('should set paginator and sort on ngAfterViewInit', () => {
    paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    sort = new MatSort();

    component.paginator = paginator;
    component.sort = sort;

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toEqual(paginator);
    expect(component.dataSource.sort).toEqual(sort);
  });

  it('should set employeeName$ and dispatch actions on initializeData', () => {
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of('test_employee'));
    component.initializeData('test_id');
    expect(store.dispatch).toHaveBeenCalledWith(
      loademployeeName({ employeeId: 'test_id' }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      loadAttendanceDetails({ employeeId: 'test_id' }),
    );
    expect(store.select).toHaveBeenCalled();
    component.employeeName$.subscribe((data) => {
      expect(data).toEqual('test_employee');
    });
  });

  it('should handle attendanceOverview correctly', () => {
    component.attendanceOverview();
    expect(
      attendanceDetailsServiceSpy.attendanceOverviewRoute,
    ).toHaveBeenCalled();
  });

  it('should format date correctly', () => {
    const timestamp = { seconds: 1616680984, nanoseconds: 0 };
    const formattedDate = component.formatDate(timestamp);
    expect(formattedDate).toBeDefined();
  });

  it('should apply filter correctly', () => {
    const event: Event = new CustomEvent('input');
    const target = { value: 'test' };
    Object.defineProperty(event, 'target', { writable: false, value: target });

    component.dataSource = new MatTableDataSource<AttendanceState>([
      {
        email: 'hr@gmail.com',
        checkInTime: new Date(),
        checkInStatus: 'Late-Arrival',
        checkInReason: 'test',
        checkOutTime: new Date(),
        checkOutStatus: 'test',
        checkOutReason: 'test',
        workingHours: 9,
        absent: null,
      },
    ]);
    component.applyFilter(event);
    expect(component.dataSource.filteredData.length).toEqual(1);
    expect(component.dataSource.filteredData[0].checkInStatus).toEqual(
      'Late-Arrival',
    );
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(store, 'dispatch');
    const mockSubscription = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]);

    component.attendanceListSubscription = mockSubscription;
    component.ngOnDestroy();

    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(loadAttendanceDetailsReset());
  });
});
