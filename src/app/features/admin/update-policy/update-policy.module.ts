import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePolicyRoutingModule } from './update-policy-routing.module';
import { UpdatePolicyComponent } from './update-policy.component';

@NgModule({
  declarations: [UpdatePolicyComponent],
  imports: [CommonModule, UpdatePolicyRoutingModule],
})
export class UpdatePolicyModule {}
