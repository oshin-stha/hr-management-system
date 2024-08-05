import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy.component';
import { EMPTY_PATH } from 'src/app/shared/constants/routes.constants';
import { ViewPolicyComponent } from './components/view-policy/view-policy.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent,
    children: [{ path: EMPTY_PATH, component: ViewPolicyComponent }],
  },
];

describe('PolicyComponent', () => {
  let component: PolicyComponent;
  let fixture: ComponentFixture<PolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyComponent],
      imports: [RouterModule.forChild(routes)],
    });
    fixture = TestBed.createComponent(PolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
