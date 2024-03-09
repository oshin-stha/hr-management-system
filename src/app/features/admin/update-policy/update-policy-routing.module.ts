import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePolicyComponent } from './update-policy.component';

const routes: Routes = [{ path: '', component: UpdatePolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePolicyRoutingModule {}
