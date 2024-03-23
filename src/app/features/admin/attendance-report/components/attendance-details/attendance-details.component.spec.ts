import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsComponent } from './attendance-details.component';

describe('AttendanceDetailsComponent', () => {
  let component: AttendanceDetailsComponent;
  let fixture: ComponentFixture<AttendanceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceDetailsComponent],
    });
    fixture = TestBed.createComponent(AttendanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
