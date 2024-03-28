import { TestBed } from '@angular/core/testing';

import { LoginFormService } from './login-form.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginFormService', () => {
  let service: LoginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    service = TestBed.inject(LoginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
