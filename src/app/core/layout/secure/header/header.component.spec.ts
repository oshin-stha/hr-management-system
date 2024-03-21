import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderSpinnerReducer } from 'src/app/shared/store/loader-store/loader-spinner.reducer';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        MatToolbarModule,
        MatIconModule,
        StoreModule.forFeature('loader', LoaderSpinnerReducer),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle admin mode', () => {
    const emitSpy = spyOn(component.isUserChange, 'emit');
    component.toggleAdminMode();

    fixture.whenStable().then(() => {
      expect(emitSpy).toHaveBeenCalledWith(false);

      component.toggleAdminMode();

      expect(component.isUser).toBe(true);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });
  });

  it('should logout', () => {
    const routerSpy = spyOn(router, 'navigate');
    spyOn(window, 'confirm').and.returnValue(true);
    component.logout();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });
});
