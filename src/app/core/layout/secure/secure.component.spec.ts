import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureComponent } from './secure.component';
import { HeaderComponent } from './header/header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SecureComponent', () => {
  let component: SecureComponent;
  let fixture: ComponentFixture<SecureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureComponent, HeaderComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(SecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
