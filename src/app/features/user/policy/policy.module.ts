import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewPolicyComponent } from './components/view-policy/view-policy.component';
import { StoreModule } from '@ngrx/store';
import { VIEW_POLICY_SELECTOR } from './store/view-policy/selectors/view-policy.selector';
import { viewPolicyReducer } from './store/view-policy/reducers/view-policy.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ViewPolicyEffect } from './store/view-policy/effects/view-policy.effect';

@NgModule({
  declarations: [PolicyComponent, ViewPolicyComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    MaterialModule,
    StoreModule.forFeature(VIEW_POLICY_SELECTOR, viewPolicyReducer),
    EffectsModule.forFeature(ViewPolicyEffect),
  ],
})
export class PolicyModule {}
