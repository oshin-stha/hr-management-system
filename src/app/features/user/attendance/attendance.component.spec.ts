import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AttendanceComponent } from './attendance.component';
import {
  checkInStart,
  checkOutStart,
  fetchAttendanceDataStart,
  fetchAttendanceDataReset,
} from './store/attendance.actions';
import { of } from 'rxjs';

xdescribe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeMock.select.and.returnValue(of());

    await TestBed.configureTestingModule({
      declarations: [AttendanceComponent],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch fetchAttendanceData action on component initialization', () => {
    expect(storeMock.dispatch).toHaveBeenCalledWith(fetchAttendanceDataStart());
  });

  it('should dispatch checkInStart action when checkIn method is called', () => {
    component.checkIn();
    expect(storeMock.dispatch).toHaveBeenCalledWith(checkInStart());
  });

  it('should dispatch checkOutStart action when checkOut method is called', () => {
    component.checkOut();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      checkOutStart({ checkInTime: new Date() }),
    );
  });

  it('should dispatch fetchAttendanceDataReset action on component destruction', () => {
    component.ngOnDestroy();
    expect(storeMock.dispatch).toHaveBeenCalledWith(fetchAttendanceDataReset());
  });
});
