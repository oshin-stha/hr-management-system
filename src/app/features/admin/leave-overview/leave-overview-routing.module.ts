import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveOverviewComponent } from './leave-overview.component';

const routes: Routes = [{ path: '', component: LeaveOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveOverviewRoutingModule {}
