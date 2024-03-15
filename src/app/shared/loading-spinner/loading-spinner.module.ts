import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { LoaderSpinnerReducer } from '../store/loader-store/loader-spinner.reducer';
import { LoadingSpinnerRoutingModule } from './loading-spinner-routing.module';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    LoadingSpinnerRoutingModule,
    MaterialModule,
    StoreModule.forFeature('loader', LoaderSpinnerReducer),
  ],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
