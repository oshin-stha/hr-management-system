import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingLeaveComponent } from './remaining-leave.component';

describe('RemainingLeaveComponent', () => {
  let component: RemainingLeaveComponent;
  let fixture: ComponentFixture<RemainingLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainingLeaveComponent],
    });
    fixture = TestBed.createComponent(RemainingLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
