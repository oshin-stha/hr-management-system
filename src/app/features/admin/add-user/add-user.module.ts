import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { Material } from 'src/app/shared/material/material.module';
import { AddUserEffect } from './store/add-user.effect';
import { AddUserReducer } from './store/add-user.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoaderSpinnerReducer } from 'src/app/shared/store/loader-store/loader-spinner.reducer';
@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    Material,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('USER_SELECTOR', AddUserReducer),
    StoreModule.forFeature('loader', LoaderSpinnerReducer),
    EffectsModule.forFeature([AddUserEffect]),
  ],
})
export class AddUserModule {}
