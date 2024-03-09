import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner.component';

const routes: Routes = [{ path: '', component: LoadingSpinnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingSpinnerRoutingModule {}
