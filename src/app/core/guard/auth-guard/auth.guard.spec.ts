import { TestBed } from '@angular/core/testing';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let mockRoute: Route;
  let mockSegments: UrlSegment[];
  let result:
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [authGuard, Router],
    });
    mockRoute = {};
    mockSegments = [];
    result = executeGuard(mockRoute, mockSegments);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('Email');
    const result = executeGuard(mockRoute, mockSegments);
    expect(result).toBe(true);
  });

  it('should redirect to loginpage if user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(result instanceof UrlTree).toBe(true);
    const urlTree = result as UrlTree;
    expect(urlTree.toString()).toBe('/');
  });
});
