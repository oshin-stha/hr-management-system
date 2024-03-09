import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoginModule } from 'src/app/features/user/login/login.module';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, PublicRoutingModule, LoginModule],
})
export class PublicModule {}
