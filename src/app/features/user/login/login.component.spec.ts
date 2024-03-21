import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { loginStart } from './store/login.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loginstart action with form data on form submission', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.patchValue({
      emailField: email,
      passwordField: password,
    });
    // component.logInUser(component.loginForm);
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      loginStart({ email, password }),
    );
  });

  it('should invalidate the form if email is invalid', () => {
    component.loginForm.patchValue({
      emailField: 'invalidemail',
      passwordField: 'password',
    });
    expect(component.loginForm.valid).toBe(false);
    expect(
      component.loginForm.get('emailField')?.errors?.['email'],
    ).toBeTruthy();
  });

  it('should invalidate the form if password is not provided', () => {
    component.loginForm.patchValue({
      emailField: 'test@example.com',
      passwordField: '',
    });
    expect(component.loginForm.valid).toBe(false);
    expect(
      component.loginForm.get('passwordField')?.errors?.['required'],
    ).toBeTruthy();
  });
});
