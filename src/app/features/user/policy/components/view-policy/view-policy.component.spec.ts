import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicyComponent } from './view-policy.component';

describe('ViewPolicyComponent', () => {
  let component: ViewPolicyComponent;
  let fixture: ComponentFixture<ViewPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPolicyComponent],
    });
    fixture = TestBed.createComponent(ViewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
