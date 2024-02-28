import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveOverviewRoutingModule } from './leave-overview-routing.module';
import { LeaveOverviewComponent } from './leave-overview.component';

@NgModule({
  declarations: [LeaveOverviewComponent],
  imports: [CommonModule, LeaveOverviewRoutingModule],
})
export class LeaveOverviewModule {}
