import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePolicyComponent } from './update-policy.component';
import { AddPolicyComponent } from './components/add-policy/add-policy/add-policy.component';
import { EMPTY_PATH } from 'src/app/shared/constants/routes.constants';

const routes: Routes = [
  {
    path: EMPTY_PATH,
    component: UpdatePolicyComponent,
    children: [{ path: EMPTY_PATH, component: AddPolicyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePolicyRoutingModule {}
