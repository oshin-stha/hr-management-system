import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePolicyRoutingModule } from './update-policy-routing.module';
import { UpdatePolicyComponent } from './update-policy.component';
import { AddPolicyComponent } from './components/add-policy/add-policy/add-policy.component';
import { Material } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ADD_POLICY_SELECTOR } from './store/add-policy/selector/add-policy.selector';
import { addPolicyReducer } from './store/add-policy/reducers/add-policy.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AddPolicyEffect } from './store/add-policy/effects/add-policy.effects';

@NgModule({
  declarations: [UpdatePolicyComponent, AddPolicyComponent],
  imports: [
    CommonModule,
    UpdatePolicyRoutingModule,
    Material,
    ReactiveFormsModule,
    StoreModule.forFeature(ADD_POLICY_SELECTOR, addPolicyReducer),
    EffectsModule.forFeature(AddPolicyEffect),
  ],
})
export class UpdatePolicyModule {}
