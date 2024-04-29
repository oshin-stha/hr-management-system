import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MaterialModule],
})
export class SnackbarModule {}
