import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { MaterialModules } from 'src/app/shared/material/material.module';
import { AddUserEffect } from './store/add-user.effect';
import { AddUserReducer } from './store/add-user.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', AddUserReducer),
    EffectsModule.forFeature([AddUserEffect]),
  ],
})
export class AddUserModule {}
