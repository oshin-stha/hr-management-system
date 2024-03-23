import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveTrendComponent } from './component/leave-trend/leave-trend.component';

const routes: Routes = [{ path: '', component: LeaveTrendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveTrendRoutingModule {}
