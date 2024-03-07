import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicComponent } from './public.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
