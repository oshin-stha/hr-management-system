import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTrendComponent } from './leave-trend.component';

describe('LeaveTrendComponent', () => {
  let component: LeaveTrendComponent;
  let fixture: ComponentFixture<LeaveTrendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveTrendComponent],
    });
    fixture = TestBed.createComponent(LeaveTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
