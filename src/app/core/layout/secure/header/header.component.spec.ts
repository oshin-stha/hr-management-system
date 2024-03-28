import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { HeaderComponent } from './header.component';
import { LoaderSpinnerReducer } from 'src/app/shared/store/loader-store/reducer/loader-spinner.reducer';
import { AttendanceReport } from 'src/app/features/admin/attendance-report/components/attendance-overview/attendance-overview-store/effects/attendance-overview.effects';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let store: Store<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'hrms/attendance-report', component: AttendanceReport },
        ]),
        MatToolbarModule,
        MatIconModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('loader', LoaderSpinnerReducer),
      ],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoading$ correctly', () => {
    spyOn(store, 'select').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isLoading$).toBeTruthy();
    component.isLoading$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should initialize isUser correctly based on role when role is admin', () => {
    localStorage.setItem('role', 'admin');
    component.ngOnInit();
    console.log('Role set to:', localStorage.getItem('role'));
    console.log('isUser before user:', component.isUser);
    expect(component.isUser).toBe(false);
  });

  it('should initialize isUser correctly based on role when role is user', () => {
    localStorage.setItem('role', 'user');
    component.ngOnInit();
    console.log('Role set to:', localStorage.getItem('role'));
    console.log('isUser before user:', component.isUser);
    expect(component.isUser).toBe(false);
  });

  it('should toggle admin mode and emit isUserChanged event', () => {
    spyOn(component.isUserChange, 'emit');

    component.toggleAdminMode();
    expect(component.isUser).toBe(true);
    expect(component.isUserChange.emit).toHaveBeenCalledWith(true);

    component.toggleAdminMode();
    expect(component.isUser).toBe(false);
    expect(component.isUserChange.emit).toHaveBeenCalledWith(false);
  });

  it('should navigate to correct paths when toggling admin mode', () => {
    spyOn(router, 'navigate');

    component.toggleAdminMode();
    expect(router.navigate).toHaveBeenCalledWith(['/', 'hrms']);

    component.toggleAdminMode();
    expect(router.navigate).toHaveBeenCalledWith([
      '/',
      'hrms',
      'attendance-report',
    ]);
  });

  it('should logout', () => {
    spyOn(router, 'navigate');
    spyOn(window, 'confirm').and.returnValue(true);

    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should emit toggleSideMenuEvent on toggleSideMenu', () => {
    spyOn(component.toggleSideMenuEvent, 'emit');

    component.toggleSideMenu();
    expect(component.toggleSideMenuEvent.emit).toHaveBeenCalled();
  });
});
