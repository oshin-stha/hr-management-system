import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveOverviewComponent } from './leave-overview.component';

describe('LeaveOverviewComponent', () => {
  let component: LeaveOverviewComponent;
  let fixture: ComponentFixture<LeaveOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveOverviewComponent],
    });
    fixture = TestBed.createComponent(LeaveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
