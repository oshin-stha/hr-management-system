import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePolicyComponent } from './update-policy.component';
import { AddPolicyComponent } from './components/add-policy/add-policy/add-policy.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatePolicyComponent,
    children: [{ path: '', component: AddPolicyComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePolicyRoutingModule {}
