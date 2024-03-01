import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/shared/material/material.module';
import { AuthReducer } from './store/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/login.effects';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule,
     LoginRoutingModule,
     ReactiveFormsModule,
     FormsModule,
     MaterialModules,
    StoreModule.forFeature('login', AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class LoginModule {}
