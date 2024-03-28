import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [RouterModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize role based on localStorage', () => {
    const role = 'admin';
    spyOn(localStorage, 'getItem').and.returnValue(role);

    component.ngOnInit();

    expect(component.role).toEqual(role);
  });

  it('should initialize role as undefined if localStorage role is not set', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.role).toBeNull();
  });
});
