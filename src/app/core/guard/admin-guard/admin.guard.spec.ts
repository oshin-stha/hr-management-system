import { TestBed } from '@angular/core/testing';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { adminGuard } from './admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('adminGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));
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
      providers: [adminGuard, Router],
    });
    mockRoute = {};
    mockSegments = [];
    result = executeGuard(mockRoute, mockSegments);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if user role is "admin"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('admin');
    const result = executeGuard(mockRoute, mockSegments);
    expect(result).toBe(true);
  });

  it('should redirect to secure module path if user role is not "admin"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    expect(result instanceof UrlTree).toBe(true);
    const urlTree = result as UrlTree;
    expect(urlTree.toString()).toBe('/hrms');
  });

  it('should redirect to secure module path if user role is absent', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    expect(result instanceof UrlTree).toBe(true);
    const urlTree = result as UrlTree;
    expect(urlTree.toString()).toBe('/hrms');
  });
});
