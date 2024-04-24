import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
