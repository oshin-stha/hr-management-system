import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HeaderComponent } from './header/header.component';
import { SecureComponent } from './secure.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

describe('SecureComponent', () => {
  let component: SecureComponent;
  let fixture: ComponentFixture<SecureComponent>;
  let store: Store<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureComponent, HeaderComponent, SideMenuComponent],
      imports: [
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        MaterialModule,
        RouterModule.forRoot([]),
      ],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(SecureComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoading$ correctly', () => {
    const loadingMockValue = true;
    spyOn(store, 'select').and.returnValue(of(loadingMockValue));
    component.ngOnInit();
    component.isLoading$.subscribe((value) => {
      expect(value).toEqual(loadingMockValue);
    });
  });

  it('should toggle side menu', () => {
    component.toggleSideMenu();
    expect(component.isSideMenuOpen).toBe(false);
    component.toggleSideMenu();
    expect(component.isSideMenuOpen).toBe(true);
  });
});
