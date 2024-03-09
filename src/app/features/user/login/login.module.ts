import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthReducer } from './store/reducer/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/login.effects';
import { RouterModule } from '@angular/router';
import { LOGIN_SELECTOR } from './store/selector/login.selector';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    StoreModule.forFeature(LOGIN_SELECTOR, AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class LoginModule {}
