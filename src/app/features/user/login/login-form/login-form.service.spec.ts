import { TestBed } from '@angular/core/testing';

import { LoginFormService } from './login-form.service';

xdescribe('FormService', () => {
  let service: LoginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
